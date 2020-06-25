<template>
  <pre>{{versions}}</pre>
</template>

<script>
import { APP_VERSIONS } from '@/utils/ipcConstant';

export default {
  name: 'About',

  computed: {
    versions() {
      return this.$store.state.versions;
    },
  },

  mounted() {
    this.$ipcRenderer.send(APP_VERSIONS);
  },
};
</script>
