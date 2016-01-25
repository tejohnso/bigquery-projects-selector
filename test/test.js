var webdriverio = require("webdriverio"),
assert = require("assert"),
fs = require("fs"),
options = {
  host: "localhost",
  port: 4444,
  desiredCapabilities: {
    browserName: "chrome",
    chromeOptions: {
      binary: "/usr/bin/google-chrome-stable"
    }
  }
},
timeForSeleniumInitialRun = 20000;

describe("end to end tests", function() {
  var client,
  id = require("./credentials.json").clientId,
  email = require("./credentials.json").email,
  pass = require("./credentials.json").pass;

  this.timeout(timeForSeleniumInitialRun);

  before(()=>{
    client = webdriverio.remote(options);
    return client.init();
  });

  describe("basic functionality", function() {
    it("can read the page title", ()=>{
      return client
      .url("localhost:8080/bigquery-projects-selector/test/importing-doc.html")
      .getTitle()
      .then((title)=> {
        console.log("Title was: " + title);
        assert.equal(title, "Bigquery Projects Selector Test");
      });
    });
  });

  describe("projects", function() {
    it("shows the list of bigquery projects", function() {
      return client.waitForExist("google-signin")
      .then(()=>{return client.execute((id)=>{
        document.querySelector("google-signin").setAttribute("client-id", id);
      }, id)})
      .then(()=>{return client.waitForEnabled("google-signin");})
      .then(()=>{return client.click("google-signin");})
      .then(()=>{return client.getTabIds();})
      .then((ids)=>{return ids.pop()})
      .then((id)=>{return client.switchTab(id);})
      .then(()=>{return client.waitForExist("#Email", 10000);})
      .then(()=>{return client.setValue("#Email", email + "\n");})
      .then(()=>{return client.waitForExist("#Passwd", 10000);})
      .then(()=>{return client.waitForEnabled("#Passwd", 10000);})
      .then(()=>{return client.setValue("#Passwd", pass + "\n");})
      .then(()=>{return client.switchTab();})
      .then(()=>{return client.waitUntil(projectListingHasBeenRetrieved, 10000);});

      function projectListingHasBeenRetrieved() {
        return client.execute(function() {
          var selectElement = document.querySelector("select");
          if (!selectElement) {return {value: 0};}
          return selectElement.children.length;
        })
        .then((domResult)=>{
          if (domResult.value > 1) {
            console.log(`Project count: ${domResult.value}`);
          }

          return domResult.value > 1;
        });
      }
    });
  });

  after(()=>{
    return client.end();
  });
});
