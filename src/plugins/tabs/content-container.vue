<script>
  export default {
    name: 'content-container',
    props: {
      panels: {
        type: Array,
        default: function() {
          return []
        }
      }
    },
    render(h) {
      const contents = this.panels.map(tab => {
        return tab.active? tab.$slots.default: null
      })
      return h('div', {
        class: 'tab-content'
      }, contents)
    }
  }
</script>

<style scoped>
.tab-content {
  margin-top: 8px;
  border: 1px solid #ccc;
  padding: 15px;
  min-height: 100px;
}
</style>