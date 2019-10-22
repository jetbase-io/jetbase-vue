<template>
  <header class="app-header navbar">
    <button type="button" class="d-lg-none navbar-toggler" @click="$emit('toggleSidebar')">
      <i class="fas fa-bars" />
    </button>
    <a class="navbar-brand">
      <img src="/media/logo.537211e7.svg" width="89" height="25" alt="JetBase Logo" class="navbar-brand-full">
      <img src="/media/sygnet.c8d5c2d9.svg" width="30" height="30" alt="JetBase Logo" class="navbar-brand-minimized">
    </a>
    <button type="button" class="d-md-down-none navbar-toggler" @click="$emit('toggleSidebar')">
      <i class="fas fa-bars" />
    </button>
    <ul class="ml-auto navbar-nav">
      <li class="dropdown nav-item">
        <a
          ref="email"
          aria-haspopup="true"
          href="#"
          class="nav-link"
          :aria-expanded="showDropdown ? 'true' : 'false'"
          @click.prevent="showDropdown = !showDropdown"
        >{{ $auth.user.email }}</a>

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
          <!--todo change password password-->
          <a href="#" tabindex="0" class="dropdown-item">
            <i class="fas fa-key" /> Change password
          </a>
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
  .dropdown-menu {
    position: absolute;
    top: 0;
    right: 0;
    will-change: transform;
    transform: translate3d(0, 37px, 0);
    left: auto;
  }
  .navbar-toggler {
    outline: 0;
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
}

</style>
