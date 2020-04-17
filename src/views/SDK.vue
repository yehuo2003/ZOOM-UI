<template>
  <custom-ui :data="$store.state.sdkList"></custom-ui>
</template>
<script>
import customUi from '../components/ui'
export default {
  components: {
    customUi
  }
};
</script>