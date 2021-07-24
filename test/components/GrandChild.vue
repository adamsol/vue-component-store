
<template>
    <div>{{ double2 }}</div>
</template>

<script>
    export default {
        injectFields: ['watch1', 'field2'],
        injectMethods: ['negate3'],

        inject: ['field4'],
        computed: {
            double2() {
                return this.field2 * 2;
            },
        },
    };
</script>
