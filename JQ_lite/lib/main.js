let DOMNodeCollection = require ("./dom_node_collection.js");

window.$l = (arg) => {
  if (typeof(arg) === "string") {
    let nodeList =  document.querySelectorAll(arg);
    return new DOMNodeCollection(nodeList);
  } else {
    return new DOMNodeCollection([arg]);
  }
};
