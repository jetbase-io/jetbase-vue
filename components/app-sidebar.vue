<template>
  <div class="sidebar">
    <div class="scrollbar-container sidebar-nav">
      <ul class="nav">
        <li class="nav-item">
          <a href="/users" :class="{active:isRoute('users')}" class="nav-link" @click.prevent="goto({name:'users'})">
            <i class="fas fa-users nav-icon" />Users
          </a>
          <!--todo roles-->
          <a href="#" class="nav-link">
            <i class="fas fa-user-shield nav-icon" />Roles
          </a>
        </li>
      </ul>
      <!--todo perfect scrollbar-->
    </div>
    <button class="sidebar-minimizer d-none d-lg-block mt-auto" type="button" aria-label="Toggle Sidebar" @click="$emit('toggleMinimized')">
      <i class="fas fa-chevron-left" />
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    goto (route) {
      this.$router.push(route)
      if (this.$device.isMobile) {
        this.$emit('goto', route)
      }
    },
    isRoute (prefix) {
      return this.$route.name.startsWith(prefix)
    }
  }
}
</script>

<style lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  padding: 0;
  color: #fff;
  background: #2f353a;
  overflow: hidden;
  .nav {
    width: 200px; // todo scss variable
    flex-direction: column;
    min-height: 100%;
    padding: 0;
  }
  .nav-item {
    position: relative;
    margin: 0;
    transition: background .3s ease-in-out;
  }
  .nav-link {
    display: block;
    padding: 0.75rem 1rem;
    color: #fff;
    text-decoration: none;
    background: transparent;
    .nav-icon {
      display: inline-block;
      width: 1.09375rem;
      margin: 0 0.5rem 0 0;
      font-size: 0.875rem;
      color: #73818f;
      text-align: center;
    }
    &.active, &.nuxt-link-active {
      color: #fff;
      background: #3a4248;
    }
    &:hover {
      color: #fff;
      background: #20a8d8;
      .nav-icon {
        color: #fff;
      }
    }
  }
  .sidebar-minimizer {
    position: relative;
    flex: 0 0 50px;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.2);
    border: 0;
    outline: 0;
    padding: 0;
    > i {
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      float: right;
      color: #73818f;
      transition: all .5s;
    }
    &:hover > i {
      color: #fff;
    }
  }
}

// rotate arrow
@media (min-width: 992px) {
  .sidebar-minimized .sidebar .sidebar-minimizer > i {
    width: 100%;
    transform: rotate(180deg);
  }
}

html:not([dir="rtl"]) .sidebar {
  margin-left: -200px;
}

@keyframes opacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@media (max-width: 575.98px) {
  .sidebar-show .main::before,
  .aside-menu-show .main::before {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1018;
    width: 100%;
    height: 100%;
    content: "";
    background: rgba(0, 0, 0, 0.7);
    animation: opacity .25s;
  }
}

@media (min-width: 576px) {
  html:not([dir="rtl"]) .sidebar-sm-show .sidebar,
  html:not([dir="rtl"]) .sidebar-show .sidebar {
    margin-left: 0;
  }
}

html:not([dir="rtl"]) .sidebar-show .sidebar {
  margin-left: 0;
}

@media (max-width: 991.98px) {
  .sidebar {
    position: fixed;
    z-index: 1019;
    width: 200px;
    height: calc(100vh - 55px);
    top: 55px;
  }
}

@media (min-width: 992px) {
  .sidebar-fixed .sidebar {
    position: fixed;
    z-index: 1019;
    width: 200px;
    height: 100vh;
  }
  .sidebar-fixed .app-header + .app-body .sidebar {
    height: calc(100vh - 55px);
  }
  html:not([dir="rtl"]) {
    .sidebar-lg-show .sidebar,
    .sidebar-show .sidebar {
      margin-left: 0;
    }
    .sidebar-lg-show.sidebar-fixed .main,
    .sidebar-lg-show.sidebar-fixed .app-footer,
    .sidebar-show.sidebar-fixed .main,
    .sidebar-show.sidebar-fixed .app-footer {
      margin-left: 200px;
    }
  }

  // minimized sidebar
  .sidebar-minimized.sidebar-fixed .sidebar {
    width: 50px;
  }
  .sidebar-minimized .sidebar .sidebar-nav {
    .nav-link {
      color: transparent;
    }
  }
  html:not([dir="rtl"]) .sidebar-lg-show.sidebar-fixed.sidebar-minimized .main,
  html:not([dir="rtl"]) .sidebar-lg-show.sidebar-fixed.sidebar-minimized .app-footer,
  html:not([dir="rtl"]) .sidebar-show.sidebar-fixed.sidebar-minimized .main,
  html:not([dir="rtl"]) .sidebar-show.sidebar-fixed.sidebar-minimized .app-footer {
    margin-left: 50px;
  }
}
</style>
