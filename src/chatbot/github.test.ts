import {githubURL, lookupGitHub} from './github';

afterEach(() => jest.restoreAllMocks());

test('only constructs account-scoped public requests', () => {
  expect(githubURL('profile', '').pathname).toBe('/users/predatorray');
  expect(githubURL('activity', '').pathname).toBe('/users/predatorray/events/public');
  expect(githubURL('contributions', '').searchParams.get('q')).toBe('author:predatorray type:pr is:public');
  expect(githubURL('repository', 'predatorray/rendezvous').pathname).toBe('/repos/predatorray/rendezvous');
  expect(githubURL('readme', 'apache/flink').pathname).toBe('/repos/apache/flink/readme');
  for (const repository of ['other/private', 'https://evil.example/x', 'predatorray/..',
    'predatorray/../other', 'predatorray/repo?x=y', 'predatorray/%2e%2e', 'predatorray/repo#x']) {
    expect(() => githubURL('repository', repository)).toThrow();
  }
});

test('omits credentials, rejects redirects, and returns only selected fields', async () => {
  const fetchMock = jest.fn().mockResolvedValue({ok: true, json: async () => ({
    full_name: 'predatorray/rendezvous', html_url: 'https://github.com/predatorray/rendezvous',
    stargazers_count: 42, private_extra: 'do not pass through',
  })});
  global.fetch = fetchMock;
  const result = await lookupGitHub('repository', 'predatorray/rendezvous', new AbortController().signal);
  expect(fetchMock).toHaveBeenCalledWith('https://api.github.com/repos/predatorray/rendezvous',
    expect.objectContaining({method: 'GET', credentials: 'omit', redirect: 'error', referrerPolicy: 'no-referrer'}));
  expect(result.data).toEqual(expect.objectContaining({stars: 42}));
  expect(JSON.stringify(result)).not.toContain('private_extra');
  expect(fetchMock.mock.calls[0][1].headers).toEqual({Accept: 'application/vnd.github+json'});
});

test('rejects forbidden repositories before fetching and reports rate limits', async () => {
  global.fetch = jest.fn().mockResolvedValue({ok: false, status: 403});
  await expect(lookupGitHub('readme', 'other/repo', new AbortController().signal)).rejects.toThrow('Only Wenhao');
  expect(fetch).not.toHaveBeenCalled();
  await expect(lookupGitHub('profile', '', new AbortController().signal)).rejects.toThrow('public API limit');
});
