<script>
  export default {
    name: 'tab',
    props: {
      index: {
        type: [String,Number],
        required: true
      },
      label: {
        type: String
      }
    },
    mounted() {
      this.$parent.panels.push(this)
    },
    render(h)  {
      const tab = this.$slots.label || h('span',this.label)  // 如果用name=label的slot,则用slot,否则展示label prop
      return h('li', {
        class: this.classes,
        on: {
          click: this.activeCurTab
        }
      },[ tab ])
    },
    computed: {
      active() {
        return this.index ===this.$parent.value
      },
      classes() {
        return ['tab', this.active? 'active': '']
      }
    },
    methods: {
      activeCurTab() {
        this.$parent.tabChange(this.index)
      }
    }
  }
</script>

<style>
.tab {
  display: inline-block;
  font-size: 14px;
  padding: 0 10px;
  height: 40px;
  line-height: 38px;
  position: relative;
  bottom: -2px;
  cursor: pointer;
  margin: 0 5px;
  border-bottom: 2px solid rgba(255,255,255,0);
}
.tab.active {
  color: #f60;
  border-bottom: 2px solid #f60;
}
</style>