<template>
  <pre>{{versions}}</pre>
</template>

<script>
export default {
  name: 'About',

  data: () => ({
    versions: process.versions,
  }),
};
</script>

<style scoped>

</style>
