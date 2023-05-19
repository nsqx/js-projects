# JSONElement.js [#](#)
Provides an interface which can convert an element into a JSON representation and convert that JSON back to HTML in text form.

```typescript
/* JSONElement.js by https://github.com/nsqx */
JSONElement: {
  create(element),
  stringify(object)
}
```

## usage
```javascript
let elementAsJSON = JSONElement.create(element);
let elementAsHTML = JSONElement.stringify(element);
```
Example:
```javascript
let bodyJSONRep = JSONElement.create(document.body);
let bodyHTML = JSONElement.stringify(bodyJSONRep);
```

## interface

`element`
> An HTMLElement or Node which is to be converted to JSON or stringified.

<sub>
  
  #### [file](JSONElement.js) | [min](JSONElement.min.js)

</sub>
