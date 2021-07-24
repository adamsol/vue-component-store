
<template>
    <div>
        {{ field1 }}
        <GrandChild />
    </div>
</template>

<script>
    import GrandChild from './GrandChild';

    export default {
        components: { GrandChild },

        provideFields: ['watch1'],
        injectFields: ['field1', 'negated3'],
        injectMethods: ['increase2'],

        data: () => ({
            watch1: '',
        }),
        watch: {
            field1(value) {
                this.watch1 = value[0];
            },
        },
    };
</script>
