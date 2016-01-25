## Bigquery projects selector
Projects will be listed and available for selection after signing in.

### Usage
Requires a [google-signin component](https://elements.polymer-project.org/elements/google-signin) somewhere on the page for user authorization.  See the test section for a working example.

### Test

 - Expects Chrome via /usr/bin/google-chrome-stable
 - Requires an http server (eg: `npm install -g http-server`)
 - Create test/client-id.json and add your Google project's client id in double quotes


```
npm install -g http-server
npm install -g selenium-standalone
npm run setup-test-env &
npm test
npm run teardown-test-env
```
