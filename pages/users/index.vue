<template>
  <div>
    <!--breadcrumb-->
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <nuxt-link :to="{name:'index'}">
            Dashboard
          </nuxt-link>
        </li>
        <li class="active breadcrumb-item" aria-current="page">
          Users
        </li>
      </ol>
    </nav>

    <!--page content-->
    <div class="container-fluid">
      <transition name="fade" appear>
        <div class="row">
          <div class="col-xl-12">
            <div class="card">
              <div class="card-header">
                <i class="fas fa-list-ul" /> Users
                <div class="card-header-actions">
                  <nuxt-link :to="{name:'users-new'}" class="card-header-action btn-setting btn btn-link">
                    <i class="fas fa-plus" />
                  </nuxt-link>
                </div>
              </div>
              <div class="card-body">
                <users-table :users="users" />
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UsersTable from '../../components/users-table'

export default {
  components: { UsersTable },
  data () {
    return {}
  },
  computed: {
    ...mapState('users', ['users'])
  },
  async fetch ({ store }) {
    await store.dispatch('users/loadUsers')
  }
}
</script>
