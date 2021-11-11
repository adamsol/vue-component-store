
<template>
    <Child />
</template>

<script>
    import Provider from '../mixins/provider';
    import Child from './Child';

    export default {
        components: { Child },
        mixins: [Provider],

        provideFields: ['field1', 'field2', 'negated3'],
        provideMethods: ['increase2', 'negate3'],

        props: {
            field1: { type: String, default: '' },
        },
        data: () => ({
            field2: 42,
            field3: true,
        }),
        provide: {
            field4: 1,
        },
        computed: {
            negated3() {
                return !this.field3;
            },
        },
        methods: {
            increase2(n = 1) {
                this.field2 += n;
            },
            negate3() {
                this.field3 = !this.field3;
            },
        },
    };
</script>
