(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.VueComponentStore = factory());
}(this, (function () { 'use strict';

    function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

    function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

    function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

    function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

    function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

    function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

    function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

    var index = {
      install: function install(Vue) {
        Vue.mixin({
          beforeCreate: function beforeCreate() {
            var _this = this;

            // Idea for provide/inject reactivity taken from https://github.com/vuejs/vue/issues/7017#issuecomment-480906691.
            // Implementation details for options merging borrowed from https://github.com/LinusBorg/vue-reactive-provide/blob/0.2.1/lib/mixins/GlobalMixin.js.
            // Note: the merge function for `inject` seems to work only with object-based definitions, even though simple lists with names to inject would suffice here.
            var field_getter = function field_getter(name) {
              return name + '_$getter';
            };

            var options = {
              provide: [],
              inject: [],
              computed: []
            };

            if (this.$options.provideFields) {
              options.provide.push(Object.fromEntries(this.$options.provideFields.map(function (name) {
                return [field_getter(name), function () {
                  return _this[name];
                }];
              })));
            }

            if (this.$options.injectFields) {
              options.inject.push(Object.fromEntries(this.$options.injectFields.map(function (name) {
                return [field_getter(name), {
                  from: field_getter(name)
                }];
              })));
              options.computed.push(Object.fromEntries(this.$options.injectFields.map(function (name) {
                return [name, {
                  get: function get() {
                    return this[field_getter(name)]();
                  }
                }];
              })));
            }

            if (this.$options.provideMethods) {
              options.provide.push(function () {
                return Object.fromEntries(_this.$options.provideMethods.map(function (name) {
                  return [name, _this[name]];
                }));
              });
            }

            if (this.$options.injectMethods) {
              options.inject.push(Object.fromEntries(this.$options.injectMethods.map(function (name) {
                return [name, {
                  from: name
                }];
              })));
            }

            for (var _i = 0, _Object$entries = Object.entries(options); _i < _Object$entries.length; _i++) {
              var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                  name = _Object$entries$_i[0],
                  array = _Object$entries$_i[1];

              var _iterator = _createForOfIteratorHelper(array),
                  _step;

              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var option = _step.value;
                  this.$options[name] = Vue.config.optionMergeStrategies[name](this.$options[name], option);
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
            }
          }
        }); // Custom optionMergeStrategies to support mixins.

        for (var _i2 = 0, _arr2 = ['provideFields', 'injectFields', 'provideMethods', 'injectMethods']; _i2 < _arr2.length; _i2++) {
          var name = _arr2[_i2];

          Vue.config.optionMergeStrategies[name] = function (a, b) {
            return a && b ? a.concat(b) : a || b;
          };
        }
      }
    };

    return index;

})));
