# zoomController.js [#](#)
An original idea, substituting the browser's in-built scroll-zoom/pinch-zoom with a custom made one for more versatility using a relatively small module.

### Demo
```ts
zoomcontroller(?target = document.querySelector("html"), ?min = 1, ?max = 3, ?amt = 1)
```
Attach controller to `html`, set minimum zoom amount to 1, maximum zoom amount to 3, default amount to 1:
```js
zoomcontroller(document.querySelector("html"), 1, 3, 1);
// or use default, same as above
zoomcontroller();
```


<sub>
  
  #### [file](https://github.com/nsqx/js-projects/blob/main/zoomController.js/zoomController.js) | [min](https://github.com/nsqx/js-projects/blob/main/zoomController.js/zoomController.min.js)

</sub>
