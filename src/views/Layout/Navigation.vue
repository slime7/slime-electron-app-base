<template>
  <v-navigation-drawer app v-bind="attrs" v-if="attrs.value">
    <v-list dense nav>
      <v-list-item :to="{ name: 'home' }" exact>
        <v-list-item-content>
          <v-list-item-title>
            Home
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item :to="{ name: 'about' }" exact>
        <v-list-item-content>
          <v-list-item-title>
            About
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Navigation',

  props: {
    attrs: Object,
  },
};
</script>
