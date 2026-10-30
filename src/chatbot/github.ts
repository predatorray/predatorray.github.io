import {Projects} from '../constants';

export const GITHUB_RESOURCES = [
  'profile', 'repositories', 'activity', 'contributions', 'repository', 'readme', 'releases',
] as const;
export type GitHubResource = typeof GITHUB_RESOURCES[number];

// Contributions listed on the site may live outside the owner's account.
const contributionRepositories = new Set(['apache/flink', 'apache/kafka']);
const siteRepositories = new Set(Projects.flatMap(project => {
  const match = project.href?.match(/^https:\/\/github\.com\/([^/]+\/[^/]+)$/);
  return match ? [match[1].toLowerCase()] : [];
}));

export function githubURL(resource: GitHubResource, repository: string): URL {
  const url = new URL('https://api.github.com');
  switch (resource) {
    case 'profile': url.pathname = '/users/predatorray'; break;
    case 'repositories':
      url.pathname = '/users/predatorray/repos';
      url.searchParams.set('sort', 'updated');
      url.searchParams.set('per_page', '20');
      break;
    case 'activity':
      url.pathname = '/users/predatorray/events/public';
      url.searchParams.set('per_page', '20');
      break;
    case 'contributions':
      url.pathname = '/search/issues';
      url.searchParams.set('q', 'author:predatorray type:pr is:public');
      url.searchParams.set('sort', 'updated');
      url.searchParams.set('per_page', '10');
      break;
    case 'repository':
    case 'readme':
    case 'releases': {
      const name = repository.toLowerCase();
      if (!/^[a-z0-9-]+\/[a-z0-9_.-]+$/.test(name) ||
          name.split('/')[1] === '.' || name.split('/')[1] === '..' ||
          !(name.startsWith('predatorray/') || siteRepositories.has(name) || contributionRepositories.has(name))) {
        throw new Error('Only Wenhao’s repositories and the contributions listed on this site are allowed.');
      }
      url.pathname = `/repos/${name}${resource === 'repository' ? '' : `/${resource}`}`;
      if (resource === 'releases') url.searchParams.set('per_page', '5');
      break;
    }
    default: throw new Error('Unsupported GitHub resource.');
  }
  return url;
}

// Project only the public fields needed by the bot, keeping tool results small.
function repositorySummary(data: any) {
  return {
    name: data.full_name, description: data.description, url: data.html_url,
    language: data.language, stars: data.stargazers_count, forks: data.forks_count,
    topics: data.topics, updated: data.updated_at, archived: data.archived,
  };
}

export async function lookupGitHub(resource: GitHubResource, repository: string, signal: AbortSignal) {
  const url = githubURL(resource, repository);
  const response = await fetch(url.toString(), {
    method: 'GET', credentials: 'omit', redirect: 'error', referrerPolicy: 'no-referrer',
    headers: {Accept: 'application/vnd.github+json'}, signal,
  });
  if (!response.ok) {
    if (response.status === 403 || response.status === 429) {
      throw new Error('GitHub’s public API limit was reached. Try again later.');
    }
    throw new Error(`Public GitHub data is unavailable (${response.status}).`);
  }
  const data = await response.json();
  let result: unknown;
  switch (resource) {
    case 'profile':
      result = {
        login: data.login, name: data.name, bio: data.bio, location: data.location,
        company: data.company, blog: data.blog, url: data.html_url,
        publicRepositories: data.public_repos, followers: data.followers,
      };
      break;
    case 'repositories': result = data.map(repositorySummary); break;
    case 'repository': result = repositorySummary(data); break;
    case 'activity':
      result = data.map((event: any) => ({
        type: event.type, repository: event.repo?.name, date: event.created_at,
        action: event.payload?.action, title: event.payload?.pull_request?.title,
        url: event.payload?.pull_request?.html_url,
      }));
      break;
    case 'contributions':
      result = {
        total: data.total_count,
        note: 'Recent public pull requests only; not a complete contribution history or contribution graph.',
        items: data.items.map((item: any) => ({
          title: item.title, url: item.html_url, state: item.state, updated: item.updated_at,
        })),
      };
      break;
    case 'readme': {
      if (data.encoding !== 'base64' || typeof data.content !== 'string') {
        throw new Error('This public README cannot be read.');
      }
      const bytes = Uint8Array.from(atob(data.content.replace(/\s/g, '')), c => c.charCodeAt(0));
      result = {url: data.html_url, text: new TextDecoder().decode(bytes).slice(0, 5000)};
      break;
    }
    case 'releases':
      result = data.map((release: any) => ({
        name: release.name, tag: release.tag_name, url: release.html_url,
        published: release.published_at, description: release.body?.slice(0, 1200),
        downloads: release.assets?.reduce((total: number, asset: any) => total + asset.download_count, 0),
      }));
      break;
  }
  return {source: url.toString(), data: result};
}
