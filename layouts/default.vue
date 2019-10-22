<template>
  <div id="layout-default" class="app">
    <app-header @toggleSidebar="toggleSidebar" />
    <div class="app-body">
      <!--todo minimize sidebar-->
      <app-sidebar @toggle="toggleSidebar" />
      <main class="main">
        <nuxt />
      </main>
    </div>
    <app-footer />
  </div>
</template>

<script>
import AppHeader from '../components/app-header'
import AppSidebar from '../components/app-sidebar'
import AppFooter from '../components/app-footer'

export default {
  components: { AppHeader, AppSidebar, AppFooter },
  head () {
    const bodyClass = [
      'header-fixed',
      'sidebar-fixed',
      'aside-menu-fixed',
      'aside-menu-off-canvas'
    ]

    if (this.showSidebar) {
      bodyClass.push('sidebar-lg-show') // todo media queries
    }

    return {
      bodyAttrs: {
        class: bodyClass.join(' ')
      }
    }
  },
  data () {
    return {
      showSidebar: true
    }
  },
  methods: {
    toggleSidebar () {
      this.showSidebar = !this.showSidebar
    }
  }
}
</script>

<style lang="scss">
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-body {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  overflow-x: hidden;
  .sidebar {
    flex: 0 0 200px;
    order: -1;
  }
  .main {
    flex: 1 1;
    min-width: 0;
  }
}

@media (min-width: 992px) {
  .header-fixed .app-body {
    margin-top: 55px;
  }
}
</style>
