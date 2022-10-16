# typewriter.js [#](#)

A small JavaScript module that creates a basic typewriter animation in DOM.
### Demo
```ts
typewriter({target, wordsArray, intervalMS, ?typingDelayMS, ?eraseDelayMS, ?naturalDelay})
```
Attach typewriter to `div.text#animatedTypeWriter`, set words to be "walter white" and "saul goodman", with 2s delay between words, 100ms interval in typing, 45ms interval in erasing, and enables natural delay:
```js
typewriter({target: document.querySelector("div.text#animatedTypeWriter"), words: ["walter white", "saul goodman"], interval: 2000, typingDelay: 100, eraseDelay: 45, naturalDelay: true});
```


<sub>
  
  #### [file](https://github.com/nsqx/js-projects/blob/main/typewriter.js/typewriter.js) | [min](https://github.com/nsqx/js-projects/blob/main/typewriter.js/typewriter.min.js)

</sub>
