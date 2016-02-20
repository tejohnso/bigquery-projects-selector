(function() {
  var thisImportDoc = document.currentScript.ownerDocument,
  selectElement = thisImportDoc.querySelector("select"),
  gapiPromise = new Promise((res)=>{
    thisImportDoc.querySelector("google-client-loader")
    .addEventListener("google-api-load", res);
  }),
  proto = Object.create(HTMLElement.prototype);
  proto.createdCallback = function() {
    this.appendChild(selectElement);
  };

  document.registerElement("bigquery-projects-selector", {prototype: proto});

  (function addSigninListeners(eventName, fn) {
    document.querySelector("google-signin").addEventListener(eventName, fn);
    return addSigninListeners;
  }
  ("google-signin-success", populateProjectsList)
  ("google-signed-out", reset));

  function populateProjectsList() {
    gapiPromise
    .then(gapi.client.bigquery.projects.list)
    .then((resp)=>{
      resp.result.projects.forEach((val)=>{
        var option = document.createElement("option");
        option.text = val.friendlyName;
        option.value = val.projectReference.projectId;
        selectElement.add(option);
      });

      selectElement.options[0].textContent = "Choose project";
    });
  }

  function reset() {
    if (!selectElement) {return;}
    for (var i = 1, j = selectElement.children.length; i < j; i += 1) {
      selectElement.removeChild(selectElement.children[1]);
    }
    selectElement.children[0].innerHTML = "Waiting for authentication";
  }
}());
