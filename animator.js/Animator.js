// implementation as class

var TIMEORIGIN = performance.timeOrigin ? performance.timeOrigin : Date.now();
// #region bezier.js
var CubicBezierGenerator = function CubicBezierGenerator(X1, Y1, X2, Y2) {
  var NEWTON_ITERATIONS = 4,
    NEWTON_MIN_SLOPE = .001,
    SUBDIVISION_PRECISION = 1e-7,
    SUBDIVISION_MAX_ITERATIONS = 10,
    sTS = 11,
    sSS = 1 / (sTS - 1);
  function P1(A1, A2) {
    return 1 - 3 * A2 + 3 * A1;
  }
  function P2(A1, A2) {
    return 3 * A2 - 6 * A1;
  }
  function P3(A1) {
    return 3 * A1;
  }
  function cB(T, A1, A2) {
    return ((P1(A1, A2) * T + P2(A1, A2)) * T + P3(A1)) * T;
  }
  function gS(T, A1, A2) {
    return 3 * P1(A1, A2) * T * T + 2 * P2(A1, A2) * T + P3(A1);
  }
  if (0 <= X1 && X1 <= 1 && 0 <= X2 && X2 <= 1 || (console.warn("CubicBezierGeneratorError: Parameter exceeds range [0,1]. Values will be clipped."), X1 = X1 < 0 ? 0 : 1 < X1 ? 1 : 0, X2 = X2 < 0 ? 0 : 1 < X2 ? 1 : 0), X1 === Y1 && X2 === Y2) return function /*LinearEasing*/ (x) {
    return x;
  };
  for (var sV = "function" == typeof Float32Array ? new Float32Array(sTS) : new Array(sTS), i = 0; i < sTS; ++i) sV[i] = cB(i * sSS, X1, X2);
  function gTFX(X) {
    for (var iS = 0, cSa = 1, lS = sTS - 1; cSa !== lS && sV[cSa] <= X; ++cSa) iS += sSS;
    --cSa;
    var gFT = iS + (X - sV[cSa]) / (sV[cSa + 1] - sV[cSa]) * sSS,
      iSl = gS(gFT, X1, X2);
    return iSl >= NEWTON_MIN_SLOPE ? function (X, gT, X1, X2) {
      for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
        var cS = gS(gT, X1, X2);
        if (0 === cS) return gT;
        gT -= (cB(gT, X1, X2) - X) / cS;
      }
      return gT;
    }(X, gFT, X1, X2) : 0 === iSl ? gFT : function (X, A, B, X1, X2) {
      var cX,
        cT,
        i = 0;
      do {
        (cX = cB(cT = A + (B - A) / 2, X1, X2) - X) > 0 ? B = cT : A = cT;
      } while (Math.abs(cX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
      return cT;
    }(X, iS, iS + sSS, X1, X2);
  }
  return function /*BezierEasing*/ (/*x=0*/) {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    if (x < 0 || 1 < x) {
      x = x < 0 ? 0 : 1 < x ? 1 : 0;
    } else if (0 === x || 1 === x) {
      return x;
    }
    return cB(gTFX(x), Y1, Y2);
  };
};
// #endregion

function Animator(_ref) {
  var duration = _ref.duration,
    onPause = _ref.onPause,
    onEnd = _ref.onEnd,
    onIterate = _ref.onIterate,
    onStart = _ref.onStart,
    indefinite = _ref.indefinite,
    timingFunction = _ref.timingFunction,
    updateFrame = _ref.updateFrame;
  var _ = {
    duration: 1,
    onPause: function onPause(obj) {},
    onEnd: function onEnd(obj) {},
    onIterate: function onIterate(obj) {},
    onStart: function onStart(obj) {},
    indefinite: false,
    timingFunction: function timingFunction(t) {
      return t;
    },
    updateFrame: function updateFrame(v) {},
    _internal$: {
      _sub$: {
        beganAt: 0,
        iteration: 0,
        playing: false,
        ended: false,
        pausedAt: 0
      },
      destroy: function destroy() {
        delete this;
      },
      pause: function pause() {
        this._internal$._sub$.playing = false;
        this._internal$._sub$.pausedAt = performance.now ? performance.now() + TIMEORIGIN : Date.now();
        this.onPause(this);
      },
      play: function play() {
        /* bound to parent, treat as if outside _internal$ */
        if (!this._internal$._sub$.playing && !this._internal$._sub$.ended) {
          this._internal$._sub$.beganAt = (performance.now ? performance.now() + TIMEORIGIN : Date.now()) - this._internal$._sub$.pausedAt + this._internal$._sub$.beganAt;
          this.updateFrame(this.timingFunction(((performance.now ? performance.now() + TIMEORIGIN : Date.now()) - this._internal$._sub$.beganAt) / (this.duration * 1000)));
        } else {
          this._internal$._sub$.beganAt = performance.now ? performance.now() + TIMEORIGIN : Date.now();
          this._internal$._sub$.iteration = 0;
          this.updateFrame(0);
          this.onStart(this);
        }
        this._internal$._sub$.playing = true;
        this._internal$._sub$.ended = false;
        this._internal$._sub$.pausedAt = 0;
        function executeFrame(now_i) {
          var now = now_i ? now_i + TIMEORIGIN : Date.now();
          // console.log(now - this._internal$._sub$.beganAt); // debug
          if (this._internal$._sub$.ended) {
            this._internal$._sub$.playing = false;
            this._internal$._sub$.beganAt = 0;
            this._internal$._sub$.iteration = 0;
            this.onEnd(this);
            return;
          }
          if (now - this._internal$._sub$.beganAt <= this.duration * 1000 && this._internal$._sub$.playing) {
            this.updateFrame(this.timingFunction((now - this._internal$._sub$.beganAt) / (this.duration * 1000)));
            (requestAnimationFrame || window.requestAnimationFrame || setTimeout || window.setTimeout)(executeFrame.bind(this));
          } else if (this.indefinite && this._internal$._sub$.playing) {
            this._internal$._sub$.iteration++;
            this._internal$._sub$.beganAt = performance.now ? performance.now() + TIMEORIGIN : Date.now();
            this.onIterate(this);
            (requestAnimationFrame || window.requestAnimationFrame || setTimeout || window.setTimeout)(executeFrame.bind(this));
          } else if (this._internal$._sub$.playing) {
            this._internal$._sub$.playing = false;
            this._internal$._sub$.ended = true;
            this._internal$._sub$.beganAt = 0;
            this._internal$._sub$.iteration = 0;
            this.updateFrame(1);
            this.onEnd(this);
          }
        }
        (requestAnimationFrame || window.requestAnimationFrame || setTimeout || window.setTimeout)(executeFrame.bind(this));
      },
      reset: function reset() {
        this.updateFrame(0);
        this._internal$._sub$.beganAt = performance.now ? performance.now() + TIMEORIGIN : Date.now();
      },
      stop: function stop() {
        this._internal$._sub$.playing = false;
        this._internal$._sub$.ended = true;
        this._internal$._sub$.pausedAt = 0;
        this._internal$._sub$.beganAt = 0;
        this.updateFrame(1);
        this.onEnd(this);
        this._internal$._sub$.iteration = 0;
      }
    },
    // Getters for pseudo-properties on object root-level, inside the frozen '_internal$' object
    get destroy() {
      return this._internal$.destroy.bind(this); /* access parent props */
    },
    get iteration() {
      return this._internal$._sub$.iteration;
    },
    get pause() {
      return this._internal$.pause.bind(this); /* access parent props */
    },
    get play() {
      return this._internal$.play.bind(this); /* access parent props */
    },
    get reset() {
      return this._internal$.reset.bind(this); /* access parent props */
    },
    get stop() {
      return this._internal$.stop.bind(this); /* access parent props */
    }
  };

  Object.freeze(_._internal$);
  _.duration = duration || _.duration;
  _.onPause = onPause || _.onPause;
  _.onEnd = onEnd || _.onEnd;
  _.onIterate = onIterate || _.onIterate;
  _.onStart = onStart || _.onStart;
  _.indefinite = indefinite || _.indefinite;
  _.timingFunction = timingFunction || _.timingFunction;
  _.updateFrame = updateFrame || _.updateFrame;
  return _;
}
