<template>
  <custom-ui :data="$store.state.devList"></custom-ui>
</template>
<script>
import customUi from '../components/ui'
export default {
  components: {
    customUi
  }
};
</script>