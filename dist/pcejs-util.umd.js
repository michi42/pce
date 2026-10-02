!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.PCEJSUtil=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
function setElAttrs(el, attrs) {
  Object.keys(attrs).forEach(function (key) {
    el.setAttribute(key, attrs[key]);
  });
  return el;
}

function emptyEl(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
  return el;
}

function loadingStatus(loadingStatusEl) {
  var initialStatus = loadingStatusEl.innerText;

  emptyEl(loadingStatusEl);

  var statusEl = setElAttrs(document.createElement('div'), {
    innerHTML: initialStatus,
  });

  var progressEl = setElAttrs(document.createElement('progress'), {
    value: 0,
    max: 100,
    hidden: true,
  });

  progressEl.style.display = 'inline';

  loadingStatusEl.appendChild(statusEl);
  loadingStatusEl.appendChild(progressEl);

  return {
    totalDependencies: 0,
    update: function (remainingDependencies) {
      this.totalDependencies = Math.max(
        this.totalDependencies,
        remainingDependencies
      );
      this.setStatus(remainingDependencies);
    },

    setStatus: function (remainingDependencies) {
      if (this.setStatus.interval) clearInterval(this.setStatus.interval);

      var loadedDependiences = this.totalDependencies - remainingDependencies;

      if (remainingDependencies) {
        statusEl.innerHTML =
          'Loading... (' +
          loadedDependiences +
          '/' +
          this.totalDependencies +
          ')';
        setElAttrs(progressEl, {
          value: loadedDependiences * 100,
          max: this.totalDependencies * 100,
          hidden: false,
        });
      } else {
        // close progress element
        setElAttrs(progressEl, {
          value: 0,
          max: 0,
          hidden: true,
        });
        loadingStatusEl.style.display = 'none';
      }
    },
  };
}

module.exports = {
  loadingStatus: loadingStatus,
};

},{}]},{},[1])
(1)
});