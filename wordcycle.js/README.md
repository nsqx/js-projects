# wordcycle.js [#](#)

Another small JavaScript module that creates a simple text cycle animation in DOM.
### Demo
```ts
wordcycle({target, words, ?interval: 2000, ?repeat: true, ?autoheight: true, ?onend: function(){}});
```
Attach wordcycle to `div.text#animatedTextWrapper`, set words to be "walter white" and "saul goodman", with 2s delay between words, repeat, and autoheight:
```js
wordcycle({target: document.querySelector("div.text#animatedTypeWriter"), words: ["walter white", "saul goodman"], interval: 2000});
```


<sub>
  
  #### [file](https://github.com/nsqx/js-projects/blob/main/typewriter.js/typewriter.js) | [min](https://github.com/nsqx/js-projects/blob/main/typewriter.js/typewriter.min.js)

</sub>
