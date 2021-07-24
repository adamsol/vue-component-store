
export default {
    install(Vue) {
        Vue.mixin({
            beforeCreate() {
                // Idea for provide/inject reactivity taken from https://github.com/vuejs/vue/issues/7017#issuecomment-480906691.
                // Implementation details for options merging borrowed from https://github.com/LinusBorg/vue-reactive-provide/.
                // Note: the merge function for `inject` seems to work only with object-based definitions, even though simple lists with names to inject would suffice here.

                const field_getter = name => name + '_$getter';
                const options = { provide: [], inject: [], computed: [] };

                if (this.$options.provideFields) {
                    options.provide.push(Object.fromEntries(this.$options.provideFields.map(name => [field_getter(name), () => this[name]])));
                }
                if (this.$options.injectFields) {
                    options.inject.push(Object.fromEntries(this.$options.injectFields.map(name => [field_getter(name), { from: field_getter(name) }])));
                    options.computed.push(Object.fromEntries(this.$options.injectFields.map(name => [name, {
                        get() {
                            return this[field_getter(name)]();
                        },
                    }])));
                }
                if (this.$options.provideMethods) {
                    options.provide.push(() => Object.fromEntries(this.$options.provideMethods.map(name => [name, this[name]])));
                }
                if (this.$options.injectMethods) {
                    options.inject.push(Object.fromEntries(this.$options.injectMethods.map(name => [name, { from: name }])));
                }

                for (const [name, array] of Object.entries(options)) {
                    for (const option of array) {
                        this.$options[name] = Vue.config.optionMergeStrategies[name](this.$options[name], option);
                    }
                }
            },
        });
    },
};
