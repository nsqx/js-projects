# typewriter.js [#](#)

A small Javascript module that creates a basic typewriter animation in DOM.
### Demo
```ts
typewriter(target, wordsArray, intervalMS, ?typingDelayMS, ?eraseDelayMS, ?naturalDelay, ?dynamicUnderline, ?oneword)
```
Attach typewriter to `div.text#animatedTypeWriter`, set words to be "walter white" and "saul goodman", with 2s delay between words, 100ms interval in typing, 45ms interval in erasing, enables natural delay, disables dynamic styling, and repeats and iterates through the list:
```js
typewriter(document.querySelector("div.text#animatedTypeWriter"), ["walter white", "saul goodman"], 2000, 100, 45, true, false, false);
```


<sub>
  
  #### [file](https://github.com/nsqx/typewriter.js/blob/main/typewriter.js) | [min](https://github.com/nsqx/typewriter.js/blob/main/typewriter.min.js)

</sub>
