import {
  require_react
} from "./chunk-PMYDY72F.js";
import {
  __toESM
} from "./chunk-ZS7NZCD4.js";

// node_modules/react-use-draggable-scroll/dist/react-use-draggable-scroll.esm.js
var import_react = __toESM(require_react());
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? import_react.useLayoutEffect : import_react.useEffect;
function useDraggable(ref, _temp) {
  var _ref = _temp === void 0 ? {} : _temp, _ref$decayRate = _ref.decayRate, decayRate = _ref$decayRate === void 0 ? 0.95 : _ref$decayRate, _ref$safeDisplacement = _ref.safeDisplacement, safeDisplacement = _ref$safeDisplacement === void 0 ? 10 : _ref$safeDisplacement, _ref$applyRubberBandE = _ref.applyRubberBandEffect, applyRubberBandEffect = _ref$applyRubberBandE === void 0 ? false : _ref$applyRubberBandE, _ref$activeMouseButto = _ref.activeMouseButton, activeMouseButton = _ref$activeMouseButto === void 0 ? "Left" : _ref$activeMouseButto, _ref$isMounted = _ref.isMounted, isMounted = _ref$isMounted === void 0 ? true : _ref$isMounted;
  var internalState = (0, import_react.useRef)({
    isMouseDown: false,
    isDraggingX: false,
    isDraggingY: false,
    initialMouseX: 0,
    initialMouseY: 0,
    lastMouseX: 0,
    lastMouseY: 0,
    scrollSpeedX: 0,
    scrollSpeedY: 0,
    lastScrollX: 0,
    lastScrollY: 0
  });
  var isScrollableAlongX = false;
  var isScrollableAlongY = false;
  var maxHorizontalScroll = 0;
  var maxVerticalScroll = 0;
  var cursorStyleOfWrapperElement;
  var cursorStyleOfChildElements;
  var transformStyleOfChildElements;
  var transitionStyleOfChildElements;
  var timing = 1 / 60 * 1e3;
  useIsomorphicLayoutEffect(function() {
    if (isMounted) {
      isScrollableAlongX = window.getComputedStyle(ref.current).overflowX === "scroll";
      isScrollableAlongY = window.getComputedStyle(ref.current).overflowY === "scroll";
      maxHorizontalScroll = ref.current.scrollWidth - ref.current.clientWidth;
      maxVerticalScroll = ref.current.scrollHeight - ref.current.clientHeight;
      cursorStyleOfWrapperElement = window.getComputedStyle(ref.current).cursor;
      cursorStyleOfChildElements = [];
      transformStyleOfChildElements = [];
      transitionStyleOfChildElements = [];
      ref.current.childNodes.forEach(function(child) {
        cursorStyleOfChildElements.push(window.getComputedStyle(child).cursor);
        transformStyleOfChildElements.push(window.getComputedStyle(child).transform === "none" ? "" : window.getComputedStyle(child).transform);
        transitionStyleOfChildElements.push(window.getComputedStyle(child).transition === "none" ? "" : window.getComputedStyle(child).transition);
      });
    }
  }, [isMounted]);
  var runScroll = function runScroll2() {
    var dx = internalState.current.scrollSpeedX * timing;
    var dy = internalState.current.scrollSpeedY * timing;
    var offsetX = ref.current.scrollLeft + dx;
    var offsetY = ref.current.scrollTop + dy;
    ref.current.scrollLeft = offsetX;
    ref.current.scrollTop = offsetY;
    internalState.current.lastScrollX = offsetX;
    internalState.current.lastScrollY = offsetY;
  };
  var rubberBandCallback = function rubberBandCallback2(e) {
    var dx = e.clientX - internalState.current.initialMouseX;
    var dy = e.clientY - internalState.current.initialMouseY;
    var _ref$current = ref.current, clientWidth = _ref$current.clientWidth, clientHeight = _ref$current.clientHeight;
    var displacementX = 0;
    var displacementY = 0;
    if (isScrollableAlongX && isScrollableAlongY) {
      displacementX = 0.3 * clientWidth * Math.sign(dx) * Math.log10(1 + 0.5 * Math.abs(dx) / clientWidth);
      displacementY = 0.3 * clientHeight * Math.sign(dy) * Math.log10(1 + 0.5 * Math.abs(dy) / clientHeight);
    } else if (isScrollableAlongX) {
      displacementX = 0.3 * clientWidth * Math.sign(dx) * Math.log10(1 + 0.5 * Math.abs(dx) / clientWidth);
    } else if (isScrollableAlongY) {
      displacementY = 0.3 * clientHeight * Math.sign(dy) * Math.log10(1 + 0.5 * Math.abs(dy) / clientHeight);
    }
    ref.current.childNodes.forEach(function(child) {
      child.style.transform = "translate3d(" + displacementX + "px, " + displacementY + "px, 0px)";
      child.style.transition = "transform 0ms";
    });
  };
  var recoverChildStyle = function recoverChildStyle2() {
    ref.current.childNodes.forEach(function(child, i) {
      child.style.transform = transformStyleOfChildElements[i];
      child.style.transition = transitionStyleOfChildElements[i];
    });
  };
  var rubberBandAnimationTimer;
  var keepMovingX;
  var keepMovingY;
  var callbackMomentum = function callbackMomentum2() {
    var minimumSpeedToTriggerMomentum = 0.05;
    keepMovingX = setInterval(function() {
      var lastScrollSpeedX = internalState.current.scrollSpeedX;
      var newScrollSpeedX = lastScrollSpeedX * decayRate;
      internalState.current.scrollSpeedX = newScrollSpeedX;
      var isAtLeft = ref.current.scrollLeft <= 0;
      var isAtRight = ref.current.scrollLeft >= maxHorizontalScroll;
      var hasReachedHorizontalEdges = isAtLeft || isAtRight;
      runScroll();
      if (Math.abs(newScrollSpeedX) < minimumSpeedToTriggerMomentum || internalState.current.isMouseDown || hasReachedHorizontalEdges) {
        internalState.current.scrollSpeedX = 0;
        clearInterval(keepMovingX);
      }
    }, timing);
    keepMovingY = setInterval(function() {
      var lastScrollSpeedY = internalState.current.scrollSpeedY;
      var newScrollSpeedY = lastScrollSpeedY * decayRate;
      internalState.current.scrollSpeedY = newScrollSpeedY;
      var isAtTop = ref.current.scrollTop <= 0;
      var isAtBottom = ref.current.scrollTop >= maxVerticalScroll;
      var hasReachedVerticalEdges = isAtTop || isAtBottom;
      runScroll();
      if (Math.abs(newScrollSpeedY) < minimumSpeedToTriggerMomentum || internalState.current.isMouseDown || hasReachedVerticalEdges) {
        internalState.current.scrollSpeedY = 0;
        clearInterval(keepMovingY);
      }
    }, timing);
    internalState.current.isDraggingX = false;
    internalState.current.isDraggingY = false;
    if (applyRubberBandEffect) {
      var transitionDurationInMilliseconds = 250;
      ref.current.childNodes.forEach(function(child) {
        child.style.transform = "translate3d(0px, 0px, 0px)";
        child.style.transition = "transform " + transitionDurationInMilliseconds + "ms";
      });
      rubberBandAnimationTimer = setTimeout(recoverChildStyle, transitionDurationInMilliseconds);
    }
  };
  var preventClick = function preventClick2(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
  };
  var getIsMousePressActive = function getIsMousePressActive2(buttonsCode) {
    return activeMouseButton === "Left" && buttonsCode === 1 || activeMouseButton === "Middle" && buttonsCode === 4 || activeMouseButton === "Right" && buttonsCode === 2;
  };
  var onMouseDown = function onMouseDown2(e) {
    var isMouseActive = getIsMousePressActive(e.buttons);
    if (!isMouseActive) {
      return;
    }
    internalState.current.isMouseDown = true;
    internalState.current.lastMouseX = e.clientX;
    internalState.current.lastMouseY = e.clientY;
    internalState.current.initialMouseX = e.clientX;
    internalState.current.initialMouseY = e.clientY;
  };
  var onMouseUp = function onMouseUp2(e) {
    var isDragging = internalState.current.isDraggingX || internalState.current.isDraggingY;
    var dx = internalState.current.initialMouseX - e.clientX;
    var dy = internalState.current.initialMouseY - e.clientY;
    var isMotionIntentional = Math.abs(dx) > safeDisplacement || Math.abs(dy) > safeDisplacement;
    var isDraggingConfirmed = isDragging && isMotionIntentional;
    if (isDraggingConfirmed) {
      ref.current.childNodes.forEach(function(child) {
        child.addEventListener("click", preventClick);
      });
    } else {
      ref.current.childNodes.forEach(function(child) {
        child.removeEventListener("click", preventClick);
      });
    }
    internalState.current.isMouseDown = false;
    internalState.current.lastMouseX = 0;
    internalState.current.lastMouseY = 0;
    ref.current.style.cursor = cursorStyleOfWrapperElement;
    ref.current.childNodes.forEach(function(child, i) {
      child.style.cursor = cursorStyleOfChildElements[i];
    });
    if (isDraggingConfirmed) {
      callbackMomentum();
    }
  };
  var onMouseMove = function onMouseMove2(e) {
    if (!internalState.current.isMouseDown) {
      return;
    }
    e.preventDefault();
    var dx = internalState.current.lastMouseX - e.clientX;
    internalState.current.lastMouseX = e.clientX;
    internalState.current.scrollSpeedX = dx / timing;
    internalState.current.isDraggingX = true;
    var dy = internalState.current.lastMouseY - e.clientY;
    internalState.current.lastMouseY = e.clientY;
    internalState.current.scrollSpeedY = dy / timing;
    internalState.current.isDraggingY = true;
    ref.current.style.cursor = "grabbing";
    ref.current.childNodes.forEach(function(child) {
      child.style.cursor = "grabbing";
    });
    var isAtLeft = ref.current.scrollLeft <= 0 && isScrollableAlongX;
    var isAtRight = ref.current.scrollLeft >= maxHorizontalScroll && isScrollableAlongX;
    var isAtTop = ref.current.scrollTop <= 0 && isScrollableAlongY;
    var isAtBottom = ref.current.scrollTop >= maxVerticalScroll && isScrollableAlongY;
    var isAtAnEdge = isAtLeft || isAtRight || isAtTop || isAtBottom;
    if (isAtAnEdge && applyRubberBandEffect) {
      rubberBandCallback(e);
    }
    runScroll();
  };
  var handleResize = function handleResize2() {
    maxHorizontalScroll = ref.current.scrollWidth - ref.current.clientWidth;
    maxVerticalScroll = ref.current.scrollHeight - ref.current.clientHeight;
  };
  (0, import_react.useEffect)(function() {
    if (isMounted) {
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("resize", handleResize);
    }
    return function() {
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      clearInterval(keepMovingX);
      clearInterval(keepMovingY);
      clearTimeout(rubberBandAnimationTimer);
    };
  }, [isMounted]);
  return {
    events: {
      onMouseDown
    }
  };
}
export {
  useDraggable
};
//# sourceMappingURL=react-use-draggable-scroll.js.map