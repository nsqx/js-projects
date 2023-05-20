// convert HTML Element to JSON representation and vice versa
// by https://github.com/nsqx

JSONElement = {
  create(element) {
    async function JSONElement(element) {
      var _ = {
        tag: element.nodeName.toLowerCase(),
        attributes: {},
      }
      for (var attr of element.attributes) {
        _.attributes[attr.name] = attr.value;
      }
      if (element.childNodes.length != 0) {
        await traverse(element).then(content => {_.contents = content});
      }
      return _;
    }
  
    async function process(element) {
      if (element.nodeName == "#text") {
        return element.textContent;
      } else if (element.nodeName == "#comment") {
        // skip
      } else {
        return await JSONElement(element);
      }
    }
  
    async function traverse(element) {
      var contents = [];
      for (var node in element.childNodes) {
        if (node <= element.childNodes.length){
          await process(element.childNodes[node]).then(content => {contents[node] = content});
        }
      }
      return contents;
    }
  
    return JSONElement(element);
  },


  stringify(JSON) {
    var voidTags = ["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"];
  
    async function process(obj) {
      var attrSoup = formatAttributes(obj.attributes);
      var queue = [];
      if (voidTags.includes(obj.tag)) {
        queue[0] = "<" + obj.tag + attrSoup + "/>";
      } else if (obj.contents) {
        queue[0] = "<" + obj.tag + attrSoup + ">";
        for (var content in obj.contents) {
          if (content > obj.contents.length) { break }
          if (typeof obj.contents[content] == "string") {
            queue[+content+1] = obj.contents[content];
          } else {
            await process(obj.contents[content]).then(returns => {
            queue[+content+1] = returns.join("");
            });
          }
        }
      } else {
        queue[0] = "<" + obj.tag + attrSoup + ">";
      }
      queue.push("</" + obj.tag + ">");
      return queue;
    }
  
    function formatAttributes(attrs) {
      var attrSoup = "";
      for (var attr in attrs) {
        attrSoup += " " + attr + "=\"" + attrs[attr] + "\"";
      }
      return attrSoup;
    }

    async function init(JSON) {
      return process(JSON).then(_ => {return _.join("")})
    }
  
    return init(JSON);
  },


  restore(JSON) {  
    async function process(obj) {
      var queue = [];
      var container = document.createElement(obj.tag);
      for (var attr in obj.attributes) {
        container.setAttribute(attr, obj.attributes[attr]);
      }
      if (obj.contents){
        for (var content in obj.contents) {
          if (content > obj.contents.length) { break }
          if (typeof obj.contents[content] == "string") {
            queue[content] = document.createTextNode(obj.contents[content]);
          } else {
            await process(obj.contents[content]).then(returns => {
              queue[content] = returns;
            });
          }
        }
        for (var element of queue) {
          container.appendChild(element);
        }
      }
      return container;
    }
  
    return process(JSON);
  }
}
