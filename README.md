# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Personal chatbot

`src/chatbot/PersonalChatbot.tsx` is mounted once inside the router, so it is available
on every page and follows the current route. It uses the browser's `LanguageModel`
Prompt API; there is no hosted model, API key, or additional dependency.

The widget is hidden unless the page is a secure context and the text model reports
`available` for English input/output. Missing APIs, unsupported devices, pending model
downloads, browser policy restrictions, initialization failures, inference failures,
and timeouts hide it. The site does not initiate model downloads. Browser and hardware
support varies, including on mobile; the interface adapts to narrow screens and the
visual viewport when an on-screen keyboard opens.

The system prompt in `src/chatbot/model.ts` uses the existing résumé, project, and
gallery constants. It speaks as Wenhao's clearly labeled AI version, limits replies
to documented personal/site topics, and refuses unrelated or mixed requests. Current
route and page text accompany each question. User messages, history, page text, and
GitHub content are explicitly treated as untrusted data. These are model guardrails,
not a guarantee that a local model will always classify or answer correctly.

Only complete user/assistant turns are saved in this tab's `sessionStorage` (up to
20 messages and 8,000 characters), surviving route changes and reloads. Closing the
tab ends the page session; Clear removes its history immediately. Storage failures
fall back to memory. Each turn creates and destroys a model session, so page context
is fresh and canceled/failed generations cannot pollute later conversations.

Tool calling uses a constrained JSON protocol over the text Prompt API instead of
requiring experimental native tool-call support. The application validates every
request, permits at most two lookups per question, and constructs GET requests only
to public `api.github.com` endpoints for `predatorray`, its repositories, or the
contribution repositories listed on the site. No credentials are sent and redirects
are rejected. Public events and pull requests are partial contribution information;
the bot must not present them as a complete contribution graph. Rate limits and
network failures are passed back as lookup errors. Model responses render as text.

For local verification, run `yarn test --watchAll=false` and `yarn build`. Browser
availability and tool behavior can be exercised with a mocked `window.LanguageModel`;
answer quality and refusal behavior should also be checked manually in a supported
browser with an installed model. Example checks: ask about Rendezvous, navigate to
Gallery and ask about the current page, request recent GitHub contributions, request
unrelated code, and try instructions embedded in quoted text.

Feature PRs target `src`. The existing workflow publishes its build to `master`
after merging; generated deployment files should not be edited directly.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
