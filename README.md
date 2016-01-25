## Bigquery projects selector
Projects will be listed and available for selection after signing in.

### Usage
Requires a [google-signin component](https://elements.polymer-project.org/elements/google-signin) somewhere on the page for user authorization.  See the test section for a working example.

### Development set up
```
bower install bigquery-projects-selector
cd bower_components
rm -rf bigquery-projects-selector && git clone https://github.com/tejohnso/bigquery-projects-selector.git
cd bigquery-projects-selector
npm install
```

### Test

 - Expects Chrome via /usr/bin/google-chrome-stable
 - Requires an http server (eg: `npm install -g http-server`)
 - Create test/credentials.json `{"clientId": "google-project-client-id", "email": "user-email", "pass": "user-pass"}`


```
npm install -g http-server
npm install -g selenium-standalone
npm run setup-test-env
npm test
npm run teardown-test-env
```
