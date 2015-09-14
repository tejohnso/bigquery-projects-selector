## Bigquery projects selector
Projects will be listed and available for selection after signing in.

Requires a [google-signin component](https://elements.polymer-project.org/elements/google-signin) somewhere on the page for user authorization.  See the test section for a working example.

### Test
```bash
cd bower_components/bigquery-projects-selector
npm install
```
Add your google project client id to the test.html file

```bash
cd ..
biquery-projects-selector/node_modules/http-server/bin/http-server
```
browse to:
http://localhost:8080/bigquery-projects-selector/test.html
