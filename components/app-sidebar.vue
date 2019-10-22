<template>
  <div class="sidebar">
    <div class="scrollbar-container sidebar-nav ps ps-container ps--active-y">
      <ul class="nav">
        <li class="nav-item">
          <nuxt-link class="nav-link" :to="{name:'users'}">
            <i class="fas fa-users nav-icon" />Users
          </nuxt-link>
        </li>
      </ul>
      <!--todo perfect scrollbar-->
    </div>
    <button class="sidebar-minimizer mt-auto" type="button" aria-label="Toggle Sidebar" @click="$emit('toggle')" />
  </div>
</template>

<style lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  padding: 0;
  color: #fff;
  background: #2f353a;
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
    &::before {
      position: absolute;
      top: 0;
      right: 0;
      width: 50px;
      height: 50px;
      content: "";
      // todo url loader
      background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 11 14'%3E%3Cpath fill='%2373818f' d='M9.148 2.352l-4.148 4.148 4.148 4.148q0.148 0.148 0.148 0.352t-0.148 0.352l-1.297 1.297q-0.148 0.148-0.352 0.148t-0.352-0.148l-5.797-5.797q-0.148-0.148-0.148-0.352t0.148-0.352l5.797-5.797q0.148-0.148 0.352-0.148t0.352 0.148l1.297 1.297q0.148 0.148 0.148 0.352t-0.148 0.352z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: center;
      background-size: 12.5px;
      transition: .3s;
    }
  }
}

html:not([dir="rtl"]) .sidebar {
  margin-left: -200px;
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
}
</style>
