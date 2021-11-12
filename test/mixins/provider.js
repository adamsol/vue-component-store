
export default {
    provideFields: ['field5'],
    provideMethods: ['increase5'],

    data: () => ({
        field5: 0,
    }),
    methods: {
        increase5(n = 1) {
            this.field5 += n;
        },
    },
};
