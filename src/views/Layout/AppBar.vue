<template>
  <v-app-bar app v-bind="attrs" v-if="attrs.value">
    <div class="headline">App</div>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar',

  props: {
    attrs: Object,
  },
};
</script>
