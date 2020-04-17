<template>
  <custom-ui :data="$store.state.componetList"></custom-ui>
</template>
<script>
import customUi from '../components/ui'
export default {
  components: {
    customUi
  }
};
</script>