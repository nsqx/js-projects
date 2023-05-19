// convert HTML Element to JSON representation and vice versa
// by https://github.com/nsqx

JSONElement = {
  create(element) {
    async function JSONElement(element) {
      var _ = {
        tagName: element.nodeName.toLowerCase(),
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
      if (voidTags.includes(obj.tagName)) {
        queue = "<" + obj.tagName + attrSoup + "/>";
      } else {
        queue = "<" + obj.tagName + attrSoup + ">"
        if (obj.contents){
          for (var content of obj.contents) {
            if (typeof content == "string") {
              queue += content;
            } else {
              await process(content).then(contentString => {
                queue += contentString;
              });
            }
          }
        }
      }
      queue += "</" + obj.tagName + ">";
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
  }
}
