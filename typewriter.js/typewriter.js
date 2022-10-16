// typewriter @v3 by github.com/nsqx
//
// Multi-element support // Custom properties can be changed, read comments

/*
* 
* Usage:
* 
* // Attach typewriter to `div.text#animatedTypeWriter`, set animated words to be "walter white" and "saul goodman", with 2s delay between words, 100ms interval in typing, 45ms interval in erasing, enables natural delay:
*  > typewriter({target: document.querySelector("div.text#animatedTypeWriter"), words: ["walter white", "saul goodman"], interval: 2000, typingDelay: 100, eraseDelay: 45, naturalDelay: true});
* // end   JS;
* 
* 
*/



function typewriter(properties = {}){
  var opt = {
    target: undefined,
    words: undefined,
    interval: 2000,
    typingDelay: 100,
    eraseDelay: 50,
    naturalDelay: true,
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
  typingDelay     = opt.typingDelay
  eraseDelay      = opt.eraseDelay
  naturalDelay    = opt.naturalDelay

  var wordindex = 0;
  var charindex = 0;
  var chars = [];

  var naturalDelayObjects = {
      1: ",:;",
      2: ".!?",
      3: "()"
  }

  function updateCharArray() {
    chars = [...words[wordindex]];
  }

  function incrementWordIndex() {
    if (wordindex < words.length -1) {
      wordindex += 1;
      updateCharArray();
    } else {
      wordindex = 0;
      updateCharArray();
    }
  }

  function incrementCharIndex() {
    if (charindex < chars.length -1) {
      charindex += 1;
    } else {
      charindex = 0;
      target.innerText = "";
      incrementWordIndex();
    }
  }

  function eraseWords() {
    delayFunction((function(){
      target.click();
      if (target.innerText.length != 0){
        target.innerText = target.innerText.slice(0,-1);
        // can include functions or set styles here to execute when // erasing text;
        eraseWords();
      } else {
        // can include functions or set styles here to execute when // typing text;
        incrementCharIndex();
        if (naturalDelay){
          updateCharNatural();
        } else {
          updateChar();
        }
      }
    }), eraseDelay)
  }

  function initThis() {
    target.innerText = "";
    target.style.whiteSpace = "pre-wrap";
    console.log("typewriter.js: Attached to element ", target, "alternating through", words, "with", interval, "ms delay between words,", typingDelay, "ms interval in typing,", eraseDelay, "ms interval in erasing, and", naturalDelay ? "natural delay." : "no natural delay.")
    updateCharArray();
  }

  /* recurse */
  function updateChar() {
    target.innerText += chars[charindex];
    target.click();
    if (charindex < chars.length -1) {
      delayFunction((function(){
        incrementCharIndex();
        updateChar();
      }), typingDelay)
    } else {
      // can include functions or set styles here to execute when // completed typing text;
      delayFunction(eraseWords, interval)
    }
  }

  /* recurse */
  function updateCharNatural() {
    target.innerText += chars[charindex];
    if (charindex < chars.length -1) {
      if (naturalDelayObjects["1"].includes(chars[charindex])) {
        delayFunction((function(){
          incrementCharIndex();
          updateCharNatural();
        }), (typingDelay * 3))
      } else if (naturalDelayObjects["2"].includes(chars[charindex])) {
        delayFunction((function(){
          incrementCharIndex();
          updateCharNatural();
        }), (typingDelay * 9))
      } else {
        delayFunction((function(){
          incrementCharIndex();
          updateCharNatural();
        }), (typingDelay))
      }
    } else {
      // can include functions or set styles here to execute when // completed typing text;
      delayFunction(eraseWords,interval);
    }
  }

  initThis();

  delayFunction((function(){
    if (naturalDelay){
      updateCharNatural();
    } else {
      updateChar();
    }
  }), typingDelay)
};
