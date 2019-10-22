<template>
  <div>
    <!--breadcrumb-->
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <nuxt-link :to="{name:'index'}">Dashboard</nuxt-link>
        </li>
        <li class="active breadcrumb-item" aria-current="page">Users</li>
      </ol>
    </nav>

    <!--page content-->
    <div class="container-fluid">
      <transition name="fade" appear>
        <div class="row">
          <div class="col-12">
            <div class="card users-card mb-3">
              <div class="card-header">
                <i class="fas fa-list-ul" /> Users
                <users-search-form class="ml-4 mr-auto" />
                <div class="card-header-actions">
                  <nuxt-link :to="{name:'users-new'}" class="card-header-action btn-setting btn btn-link">
                    <i class="fas fa-plus" />
                  </nuxt-link>
                </div>
              </div>
              <div class="card-body">
                <users-table :users="users" @deleted="deleteUser" />
                <pagination :count="count" :value="page" @input="paginate" />
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import UsersSearchForm from '../../components/users-search-form'
import UsersTable from '../../components/users-table'
import Pagination from '../../components/pagination'

export default {
  components: { UsersSearchForm, UsersTable, Pagination },
  computed: {
    ...mapState('users', ['users', 'count']),
    ...mapGetters('users', ['page'])
  },
  async fetch ({ store }) {
    await store.dispatch('users/loadUsers')
  },
  methods: {
    ...mapMutations('users', ['deleteUser']),
    paginate () {
      console.log('paginate') // todo paginate
    }
  }
}
</script>

<style lang="scss">
.users-card {
  .card-header {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
  }
}
</style>
