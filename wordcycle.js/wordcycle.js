// cycleWords @v1 by github.com/nsqx

/*
* 
* Usage:
* 
* // Attach wordcycle to `div.text#animatedTypeWriter`, set animated words to be "walter white" and "saul goodman", with 2s delay between words:
*  > typewriter({target: document.querySelector("div.text#animatedTypeWriter"), words: ["walter white", "saul goodman"], interval: 2000);
* // end   JS;
* 
* 
*/


function wordcycle(properties = {}){
  var opt = {
    target: undefined,
    words: undefined,
    interval: 2000,
    repeat: true,
    autoheight: true,
    onend: function(){}
  }

  function transferProperties(object, target) {
    var $ = target;
    for (const _ in target) { if (object[_] != undefined) { $[_] = object[_] } }
    return $
  }

  const delayFunction = window.setTimeout || setTimeout || function(func){func();return-1};

  opt = transferProperties(properties, opt)

  target          = opt.target
  words           = opt.words
  interval        = opt.interval
  repeat          = opt.repeat
  onend           = opt.onend
  autoheight      = opt.autoheight

  if (opt.repeat && properties['onend'] != undefined) {
    console.warn("Function 'onend' will not be executed when 'repeat' is true. (wordcycle)")
  }

  if (typeof(onend) != 'function') {
    console.warn("The provided 'onend' argument is not a function. It will not be executed. (wordcycle)");
  }

  var currentword = 0;
  var accesswordlist = [];

  function init() {
    target.innerText = "";
    target.style.transition = "height .5s cubic-bezier(0.165, 0.84, 0.44, 1)";
    for (word of words) {
      var n_W = document.createElement("div");
      n_W.style = "display: block; box-sizing: border-box; width: 100%; white-space: pre-wrap; position: absolute; transition: transform .5s cubic-bezier(0.48, 0.08, 0.19, 1), opacity .5s cubic-bezier(0.48, 0.08, 0.19, 1); opacity: 0; transform: translateY(100%);left: 0;";
      n_W.innerHTML = word;
      accesswordlist.push(target.appendChild(n_W));
    }
    console.log("Attached to element", target, "(wordcycle)");
    accesswordlist[currentword].style.opacity = 1;
    accesswordlist[currentword].style.transform = "translateY(0%)";
    updateContainerHeight();
    delayFunction(nextWord, interval);
  }

  function updateContainerHeight() {
    if (autoheight) {
      target.style.height = accesswordlist[currentword].getBoundingClientRect().height + "px";
    }
  }

  function nextWord() {
    if (currentword + 1 < words.length) {
      accesswordlist[currentword].style.opacity = 0;
      accesswordlist[currentword].style.transform = "translateY(-100%)";
      accesswordlist[currentword].style.pointerEvents = "none";
      var previous = accesswordlist[currentword]
      currentword += 1;
      accesswordlist[currentword].style.opacity = 1;
      accesswordlist[currentword].style.transform = "translateY(0%)";
      updateContainerHeight();
      accesswordlist[currentword].style.pointerEvents = "auto";
      delayFunction(nextWord, interval)
      delayFunction(function() {previous.style.transition = "0s"; previous.style.transform = "translateY(100%)"; previous.style.transition = "transform .5s cubic-bezier(0.48, 0.08, 0.19, 1), opacity .5s cubic-bezier(0.48, 0.08, 0.19, 1)"; }, interval)
    } else {
      if (repeat) {
        accesswordlist[currentword].style.opacity = 0;
        accesswordlist[currentword].style.transform = "translateY(-100%)";
        accesswordlist[currentword].style.pointerEvents = "none";
        var previous = accesswordlist[currentword]
        currentword = 0;
        accesswordlist[currentword].style.opacity = 1;
        accesswordlist[currentword].style.transform = "translateY(0%)";
        updateContainerHeight();
        accesswordlist[currentword].style.pointerEvents = "auto";
        delayFunction(nextWord, interval)
        delayFunction(function() {previous.style.transition = "0s"; previous.style.transform = "translateY(100%)"; previous.style.transition = "transform .5s cubic-bezier(0.48, 0.08, 0.19, 1), opacity .5s cubic-bezier(0.48, 0.08, 0.19, 1)"; }, interval)
      } else {
        if (typeof(onend) == 'function') {
          try {
            onend(accesswordlist);
          } catch (err) {
            console.error("An error occured while executing 'onend':\n(begin)\n\n", err, "\n\n(end)\nPlease check for any errors in the function passed into the 'onend' argument. (wordcycle)")
          }
        } else {
          console.warn("The provided 'onend' argument is not a function. (wordcycle)");
        }
      }
    }
  }

  init();
};
