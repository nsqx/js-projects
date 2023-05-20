# JSONElement.js [#](#)
Provides an interface which can convert an Element into a JSON abstraction and back to an Element or HTML in text form.

```typescript
/* JSONElement.js by https://github.com/nsqx */
JSONElement: {
  create(element),
  restore(object),
  stringify(object)
}
```

## usage
```javascript
JSONElement.create(element).then(obj => { /* do stuff */ });
JSONElement.restore(obj).then(element => { /* do stuff */ });
JSONElement.stringify(obj).then(html => { /* do stuff */ });
```

## interface

`async` method `create(element)`
> Accepts an Element or Node, returns a JavaScript object which abstractly represents the element, its attributes, and its contents.

`async` method `restore(obj)`
> Accepts an object which was created by `JSONElement.create`, returns a JavaScript Element.

`async` method `stringify(obj)`
> Accepts an object which was created by `JSONElement.create`, returns a string containing the element in HTML.

<sub>
  
  #### [file](JSONElement.js) | [min](JSONElement.min.js)

</sub>
