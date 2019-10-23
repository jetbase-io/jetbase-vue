<template>
  <div id="layout-default" class="app">
    <app-header @toggleSidebar="showSidebar = !showSidebar" @logoClick="hideSidebarIfMobile" @ddClick="hideSidebarIfMobile" />
    <div class="app-body">
      <app-sidebar @toggleMinimized="sidebarMinimized = !sidebarMinimized" @goto="hideSidebarIfMobile" />
      <main class="main" @click="showSidebar = false">
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
      bodyClass.push(this.showSidebarClass)
    }

    if (this.sidebarMinimized) {
      bodyClass.push('sidebar-minimized')
      bodyClass.push('brand-minimized')
    }

    return {
      bodyAttrs: {
        class: bodyClass.join(' ')
      }
    }
  },
  data () {
    return {
      showSidebar: this.$device.isDesktop,
      sidebarMinimized: false
    }
  },
  computed: {
    showSidebarClass () {
      // show sidebar using media queries on client
      if (process.client) {
        if (window.matchMedia('(min-width: 992px)').matches) {
          return 'sidebar-lg-show' // Desktop
        } else {
          return 'sidebar-show' // Mobile
        }
      }

      // show sidebar using 'User-Agent' header on server
      if (this.$device.isDesktop) {
        return 'sidebar-lg-show' // Desktop
      } else {
        return 'sidebar-show' // Mobile
      }
    }
  },
  methods: {
    hideSidebarIfMobile () {
      console.log('hideSidebarIfMobile')
      if (this.$device.isMobile && this.showSidebar) {
        this.showSidebar = false
      }
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

.main {
  position: relative;
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
