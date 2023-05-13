# animator.js [#](#)
A versatile JavaScript interface extending on the HTMLElement prototype which enables the versatile animation of both CSS and non-CSS properties.

```typescript
/**
 * animation.js v0.0.0.1 by https://github.com/nsqx
 * @interface
 */
 HTMLElement.prototype.animator: {
   duration: 1,
   onPause(obj) {},
   onEnd(obj) {},
   onIterate(obj) {},
   onStart(obj) {},
   indefinite: false,
   timingFunction(t) { return t },
   updateFrame(v) {},
   iteration: [internal$].iteration,
   pause() { [internal$].pause() },
   play() { [internal$].play() },
   reset() { [internal$].reset() },
   stop() { [internal$].stop() }
 }
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
  
  #### [file](animator.js) | [min](animator.min.js)

</sub>
