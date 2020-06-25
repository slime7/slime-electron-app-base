<template>
  <v-app>
    <v-system-bar app class="system-bar pa-0">
      <v-spacer></v-spacer>
      <window-controls :is-maximize="isMaximize"></window-controls>
    </v-system-bar>

    <navigation :attrs="navigationAttrs"/>

    <app-bar :attrs="appBarAttrs"/>

    <v-main class="fill-height">
      <div class="d-flex flex-column fill-height" id="app-main-container">
        <div class="scroll-content flex">
          <router-view/>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import WindowControls from '@/components/WindowControls';
import AppBar from '@/views/Layout/AppBar';
import Navigation from '@/views/Layout/Navigation';
import { APP_VERSIONS } from '@/utils/ipcConstant';

export default {
  name: 'Layout',

  components: {
    Navigation,
    WindowControls,
    AppBar,
  },

  data: () => ({
    isMaximize: false,
    // layout 开关
    // app bar
    appBar: {
      show: true,
      elevateOnScroll: false,
    },
    // navigation
    navigation: {
      show: true,
      position: 'left',
      clipped: true,
    },
  }),

  computed: {
    appBarAttrs() {
      const config = {
        scrollTarget: '#app-main-container > .scroll-content',
        // ... default attrs
      };
      config.value = this.appBar.show;
      if (this.appBar.show && this.navigation.clipped) {
        if (this.navigation.position === 'left') {
          config.clippedLeft = true;
        } else {
          config.clippedRight = true;
        }
      }
      config.elevateOnScroll = this.appBar.elevateOnScroll;
      return config;
    },
    navigationAttrs() {
      const config = {
        permanent: true,
        // ... default attrs
      };
      config.value = this.navigation.show;
      config.clipped = this.navigation.clipped;
      config[this.navigation.position] = true;
      return config;
    },
  },

  methods: {
    onMaximizeStatusChange() {
      this.$ipcRenderer.on('set-maximize-status', (maximize) => {
        this.isMaximize = maximize;
      });
    },
    onGetVersion() {
      this.$ipcRenderer.on(APP_VERSIONS, (versions) => {
        this.$store.commit('setVersions', versions);
      });
    },
    onMounted() {
      this.onMaximizeStatusChange();
      this.onGetVersion();
    },
    onUnmounted() {
      this.$ipcRenderer.detach('set-maximize-status');
      this.$ipcRenderer.detach(APP_VERSIONS);
    },
  },

  mounted() {
    this.onMounted();
  },

  destroyed() {
    this.onUnmounted();
  },
};
</script>

<style scoped>
#app-main-container > .scroll-content {
  min-height: 0;
  overflow-y: auto;
}
</style>
