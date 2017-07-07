class DOMNodeCollection {

  constructor (htmlElements) {
    this.$htmlElements = htmlElements;
  }

  html (arg) {
    if (!arg) {
      return this.$htmlElements[0].innerHTML;
    } else {
      this.$htmlElements.forEach(function (node) {
        node.innerHTML = arg;
      });
    }
  }

  empty () {
    this.$htmlElements.forEach(function (node) {
      node.innerHTML = "";
    });
  }

  append (arg) {
    if (typeof(arg) === "string") {
      this.$htmlElements.forEach(function (node) {
        node.innerHTML += arg;
      });
    } else if (arg instanceof HTMLElement) {
      this.$htmlElements.forEach(function (node) {
        node.innerHTML += arg.outerHTML;
      });
    } else {
      let self = this;
      arg.$htmlElements.forEach(function (ele) {
        self.$htmlElements.forEach(function (node) {
          node.innerHTML += ele.outerHTML;
        });
      });
    }
  }

  children () {
    let arr = [];
    this.$htmlElements.forEach(function (node) {
      node.children.forEach(function (child) {
        arr.push(child);
      });
    });
    return new DOMNodeCollection(arr);
  }

  parent () {
    let parArr = [];
    this.$htmlElements.forEach(function (node) {
      parArr.push(node.parent);
    });
    return new DOMNodeCollection(parArr);
  }

  find (arg) {
    let findArr = [];
    for (var i = 0; i < this.$htmlElements.length; i++) {
      if (arg === arg.slice(1)) {
        findArr = findArr.concat(this.$htmlElements[i].children.$htmlElements);
      }
    }
    return new DOMNodeCollection(findArr);
  }
}

module.exports = DOMNodeCollection;
