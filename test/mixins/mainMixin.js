export default {
  data() {
    return {
      fieldFromMainMixin: 'fieldFromMainMixin'
    }
  },
  provideFields: ['fieldFromMainMixin'],
  provideMethods: ['methodFromMainMixin'],
  methods: {
    methodFromMainMixin() {
      return 'methodFromMainMixin'
    }
  }
}
