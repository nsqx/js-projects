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
      await element.childNodes.forEach(node => {
        process(node).then(content => {contents.push(content)});
      })
      return contents;
    }
  
    return JSONElement(element);
  },


  stringify(JSON) {
    var voidTags = ["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"];
  
    async function process(obj) {
      var attrSoup = formatAttributes(obj.attributes);
      var queue = "";
      if (voidTags.includes(obj.tag)) {
        queue = "<" + obj.tag + attrSoup + "/>";
      } else {
        queue = "<" + obj.tag + attrSoup + ">"
        if (obj.contents){
          for (var content of obj.contents) {
            if (typeof content == "string") {
              queue += content;
            } else {
              await process(content).then(contentStr => {
                queue += contentStr;
              });
            }
          }
        }
      }
      queue += "</" + obj.tag + ">";
      return queue;
    }
  
    function formatAttributes(attrs) {
      var attrSoup = "";
      for (var attr in attrs) {
        attrSoup += " " + attr + "=\"" + attrs[attr] + "\"";
      }
      return attrSoup;
    }
  
    return process(JSON);
  },


  restore(JSON) {  
    async function process(obj) {
      var returns = document.createElement(obj.tag);
      for (var attr in obj.attributes) {
        returns.setAttribute(attr, obj.attributes[attr]);
      }
      if (obj.contents){
        for (var content of obj.contents) {
          if (typeof content == "string") {
            returns.appendChild(document.createTextNode(content));
          } else {
            await process(content).then(contentObj => {
              returns.appendChild(contentObj);
            });
          }
        }
      }
      return returns;
    }
  
    return process(JSON);
  }
}
