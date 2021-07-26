vue-component-store
===================

[![License](https://img.shields.io/github/license/adamsol/vue-component-store.svg)](https://github.com/adamsol/vue-component-store/blob/master/LICENSE.txt)
[![CI](https://github.com/adamsol/vue-component-store/actions/workflows/ci.yml/badge.svg)](https://github.com/adamsol/vue-component-store/actions)
[![npm](https://img.shields.io/npm/v/vue-component-store.svg)](https://www.npmjs.com/package/vue-component-store)

A simple plugin for Vue.js 2.5–2.6, offering a clean way to keep the state of your application inside your components.

This library was inspired by https://github.com/LinusBorg/vue-reactive-provide. The basic idea is similar, but the API and implementation are different.

Why?
----

1. Vuex is centralized by design, but suggests dividing the store into modules to mimic the application's structure. This usually requires a lot of boilerplate. It's easier to use the existing component hierarchy and Vue's reactivity system directly instead.
2. Vue has a `provide`/`inject` mechanism for passing data down the component hierarchy without chains of props, but [it's not reactive by default](https://github.com/vuejs/vue/issues/7017).

Installation
------------

```sh
npm install vue-component-store
```

```js
import VueComponentStore from 'vue-component-store';

Vue.use(VueComponentStore);
```

API
---

You can use the following new options in your components:

* `provideFields` – A list of fields (from `props`, `data`, or `computed`) to share with the descendant components. The fields will be reactive (one-way binding, like props).
* `injectFields` – A list of fields (provided by ancestor components) to use in the current component. The effect is similar to using `mapState` and `mapGetters` from Vuex.
* `provideMethods` – A list of methods to share with the descendant components.
* `injectMethods` – A list of methods (provided by ancestor components) to use in the current component. This is functionally equivalent to bare `inject`, but exists for consistency of the API. The effect is similar to using `mapActions` from Vuex.

In order to share global state between all components in your application, use `provideFields`/`provideMethods` in the root component.

Example
-------

See https://github.com/adamsol/vue-component-store/tree/master/test/components/.
