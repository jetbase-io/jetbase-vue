<template>
  <header class="app-header navbar">
    <button type="button" class="d-lg-none navbar-toggler navbar-toggler-mobile" @click="$emit('toggleSidebar')">
      <i class="fas fa-bars" />
    </button>
    <nuxt-link class="navbar-brand" to="/">
      <img src="/media/logo.svg" width="100" height="30" alt="JetBase Logo" class="navbar-brand-full">
      <img src="/media/logo-small.svg" width="30" height="30" alt="JetBase Logo" class="navbar-brand-minimized">
    </nuxt-link>
    <button type="button" class="d-none d-lg-block navbar-toggler" @click="$emit('toggleSidebar')">
      <i class="fas fa-bars" />
    </button>
    <ul v-if="$auth.loggedIn" class="ml-auto navbar-nav">
      <li class="dropdown nav-item">
        <a
          ref="email"
          aria-haspopup="true"
          href="#"
          class="nav-link"
          :aria-expanded="showDropdown ? 'true' : 'false'"
          @click.prevent="showDropdown = !showDropdown"
        >
          <span class="pointer-events-none d-sm-none"><i class="fas fa-fw fa-user" /></span>
          <span class="pointer-events-none d-none d-sm-inline">{{ $auth.user.email }}</span>
        </a>

        <div
          tabindex="-1"
          role="menu"
          :aria-hidden="showDropdown ? 'false' : 'true'"
          class="dropdown-menu dropdown-menu-right"
          :class="{show: showDropdown}"
        >
          <nuxt-link :to="{name:'users-id', params: {id: $auth.user.id}}" tabindex="0" class="dropdown-item">
            <i class="fas fa-fw fa-user" /> Profile
          </nuxt-link>
          <nuxt-link :to="{name:'users-id-password', params: {id: $auth.user.id}}" tabindex="0" class="dropdown-item">
            <i class="fas fa-key" /> Change password
          </nuxt-link>
          <button type="button" tabindex="0" class="dropdown-item" @click="logout">
            <i class="fas fa-sign-out-alt" /> Logout
          </button>
        </div>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  data () {
    return {
      showDropdown: false
    }
  },
  mounted () {
    document.addEventListener('click', this.docClick)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.docClick)
  },
  methods: {
    docClick (e) {
      if (e.target !== this.$refs.email) {
        this.showDropdown = false
      }
    },
    logout () {
      this.$auth.logout()
    }
  }
}
</script>

<style lang="scss">
.app-header {
  position: relative;
  flex-direction: row;
  height: 55px;
  margin: 0;
  background-color: #fff;
  border-bottom: 1px solid #c8ced3;
  flex: 0 0 55px;
  padding-top: 0;
  padding-bottom: 0;
  .dropdown-menu {
    position: absolute;
    top: 0;
    right: 0;
    will-change: transform;
    transform: translate3d(0, 37px, 0);
    left: auto;
  }
  .navbar-brand {
    height: 55px;
    width: 155px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 50%;
    margin: 0 0 0 -77.5px;
    .navbar-brand-minimized {
      display: none;
    }
  }
  .navbar-toggler {
    outline: 0;
    width: 45px;
    border-radius: 0;
    height: 55px;
    color: #73818f;
    &:hover {
      color: #2f353a;
    }
  }
  .navbar-toggler-mobile {
    width: 50px;
    margin-left: -1rem;
  }
}

@media (min-width: 992px) {
  .header-fixed .app-header {
    position: fixed;
    z-index: 1020;
    width: 100%;
    top: 0;
    left: 0;
  }

  // desktop brand
  .app-header .navbar-brand {
    margin: 0 0 0 -1rem;
    position: static;
  }
  // show small logo
  .brand-minimized .app-header .navbar-brand {
    width: 50px;
    background-color: transparent;
    .navbar-brand-full {
      display: none;
    }
    .navbar-brand-minimized {
      display: block;
    }
  }
}

</style>
