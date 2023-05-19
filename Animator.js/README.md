# Animator.js [#](#)
A versatile and low-level JavaScript interface (class) which enables the animation of both CSS and non-CSS properties via custom functions.

```typescript
/* Animator.js by https://github.com/nsqx */
class Animator {
  duration: 1,
  onPause(obj) {},
  onEnd(obj) {},
  onIterate(obj) {},
  onStart(obj) {},
  indefinite: false,
  timingFunction(t) { return t },
  updateFrame(v) {},
  destroy() { [internal$].destroy() }.
  iteration: [internal$].iteration,
  pause() { [internal$].pause() },
  play() { [internal$].play() },
  reset() { [internal$].reset() },
  stop() { [internal$].stop() }
}
```

## usage
```javascript
let animatorController = new Animator({duration: 1, onPause: function, onEnd: function, onIterate: function, onStart: function, indefinite: false, timingFunction: function, updateFrame: function});
```
Example:
```javascript
let animatorController = new Animator({duration: 1, onEnd: console.log, timingFunction: CubicBezierGenerator(.25, .1, .25, 1), updateFrame(v){element.style.transform = `translateX(${v * 100}px)`} });
animatorController.play();
```

## interface

`duration`
> How long an animation iteration should run for.

`onPause(obj)`
> Executes when the animation is paused via `pause()`. This function is passed `this` as an argument (`[HTMLElement].animator`).

`onEnd(obj)`
> Executes when the animation ends either naturally or via `stop()`. This function is passed `this` as an argument (`[HTMLElement].animator`).

`onIterate(obj)`
> Executes when an animation iteration completes, when `indefinite` is true. This function is passed `this` as an argument (`[HTMLElement].animator`).

`onStart(obj)`
> Executes when the animation starts playing via `play()`. This function is passed `this` as an argument (`[HTMLElement].animator`).

`indefinite`
> Determines whether or not the animation should repeat after an iteration completes.

`timingFunction(t)`
> A function which, when passed a time value `t` within range `[0,1]`, returns an output value within a reasonable range of `[0,1]`. The included `CubicBezierGenerator` provides a method for generating this function.
- `[global].CubicBezierGenerator(X1,Y1,X2,Y2)`
- > Returns a generator function which, when passed a time value `t` within range `[0,1]`, returns the corresponding y-value of the cubic Bézier curve with $P0=(0,0)$, $P1=(X1,Y1)$, $P2=(X2,Y2)$, and $P3=(1,1)$.

`updateFrame(v)`
> A function which is called at regular (~16ms) intervals when the animation target needs to be updated. This function is passed the result of `timingFunction(t)`, where `t` is the percent progress of the animation in decimal form.

`destroy()`
> Destroys the Animator controller. Recommended to be called after an animation ends for garbage collection.

`iteration`
> How many iterations of the animation have run, when `indefinite` is true.

`pause()`
> Pauses the animation.

`play()`
> Begins the animation.

`reset()`
> Resets animation progress `t` to 0.

`stop()`
> Ends the animation and sets animation progress `t` to 1.

<sub>
  
  #### [file](Animator.js) | [min](Animator.min.js)

</sub>
