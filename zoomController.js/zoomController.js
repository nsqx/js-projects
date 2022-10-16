// zoomController @v2 by github.com/nsqx

// Change log
//
// Support for multi-element, better modularity
// Local-element support is buggy for transform-origin that does not take up the full screen, please only use on `html` or `body`

/*
* 
* Usage:
* 
* To attach directly to `html` by default, use this code:
`   zoomcontroller();
`
*
* To attach to custom element (not recommended), use this code:
`   zoomcontroller(element); // element = document.querySelector("body.ls__d")
`
*
*/

const zoomcontroller = (function(target = document.querySelector("html"), min = 1, max = 3, amt = 1) {
    const helper = {
        generateHx: function(size){
            return [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('').toUpperCase();
        },
        qsr: function(query) {
            return document.querySelector(query);
        },
        cPush: function(target){
            target.style.transform = "scale(" + target.zoomObj.amt + ")";
            target.style.transformOrigin = (target.zoomObj.cliX + target.scrollLeft) + "px " + (target.zoomObj.cliY + target.scrollTop) + "px";
        }
    };

    var cliX = 0;
    var cliY = 0;

    target.zoomObj = {};
    target.zoomObj.amt = amt;
    target.zoomObj.max = max;
    target.zoomObj.min = min;
    target.zoomObj.cliX = cliX;
    target.zoomObj.cliY = cliY;

    function init() {
        target.zoomObj.thisHex = "zm" + helper.generateHx(16);
        target.classList.add(target.zoomObj.thisHex);
        target.setAttribute(target.zoomObj.thisHex, "");

        target.style.transition = "all .5s cubic-bezier(0.165, 0.84, 0.44, 1.009)";
        target.style.transform = "scale(" + target.zoomObj.amt + ")";
        target.style.transformOrigin = "0px 0px";
    }

    function attachListener() {
        target.addEventListener("wheel", controllerUpdate, {passive: false})
    }

    function controllerUpdate(evt) {

        if (evt.ctrlKey){
            evt.preventDefault();
            evt.stopImmediatePropagation();
            evt.stopPropagation();
            
            if (target.zoomObj.amt + (- evt.deltaY / 64) <= target.zoomObj.max /* rebound softmax */ && target.zoomObj.amt + (- evt.deltaY / 64) >= target.zoomObj.min){
                target.zoomObj.amt += (- evt.deltaY / 64);
                target.style.transform = "scale(" + target.zoomObj.amt + ")";
                target.style.transformOrigin = (target.zoomObj.cliX + target.scrollLeft) + "px " + (target.zoomObj.cliY + target.scrollTop) + "px";
            } else if (target.zoomObj.amt + (- evt.deltaY / 64) >= target.zoomObj.max){
                target.zoomObj.amt = target.zoomObj.max;
                target.style.transform = "scale(" + target.zoomObj.amt + ")";
                target.style.transformOrigin = (target.zoomObj.cliX + target.scrollLeft) + "px " + (target.zoomObj.cliY + target.scrollTop) + "px";
            } else {
                target.zoomObj.amt = target.zoomObj.min;
                target.style.transform = "scale(" + target.zoomObj.amt + ")";
                target.style.transformOrigin = (target.zoomObj.cliX + target.scrollLeft) + "px " + (target.zoomObj.cliY + target.scrollTop) + "px";
            }
            target.zoomObj.cliX = evt.clientX;
            target.zoomObj.cliY = evt.clientY;
        } else if (target.zoomObj.amt > target.zoomObj.min) {
            if (target.zoomObj.cliY + evt.deltaY > 0 && target.zoomObj.cliY + evt.deltaY < window.innerHeight){
                target.zoomObj.cliY += evt.deltaY;
                target.style.transform = "scale(" + target.zoomObj.amt + ")";
                target.style.transformOrigin = (target.zoomObj.cliX + target.scrollLeft) + "px " + (target.zoomObj.cliY + target.scrollTop) + "px";
            }
            if (target.zoomObj.cliX + evt.deltaX > 0 && target.zoomObj.cliX + evt.deltaX < window.innerWidth){
                target.zoomObj.cliX += evt.deltaX;
                target.style.transform = "scale(" + target.zoomObj.amt + ")";
                target.style.transformOrigin = (target.zoomObj.cliX + target.scrollLeft) + "px " + (target.zoomObj.cliY + target.scrollTop) + "px";
                if (Math.round(evt.deltaY) == 0){
                    evt.preventDefault();
                }
            }
        }
    }

    init();
    attachListener();
})
