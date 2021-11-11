
<template>
    <div>{{ double2 }}</div>
</template>

<script>
    export default {
        injectFields: ['watch1', 'field2', 'fieldFromMainMixin'],
        injectMethods: ['negate3', 'methodFromMainMixin'],

        inject: ['field4'],
        computed: {
            double2() {
                return this.field2 * 2;
            },
        },
    };
</script>
