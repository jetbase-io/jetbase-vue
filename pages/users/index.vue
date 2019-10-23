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
                <span class="text-nowrap"><i class="fas fa-list-ul header-icon" /> Users</span>
                <div class="card-header-actions ml-auto order-sm-last">
                  <nuxt-link :to="{name:'users-new'}" class="card-header-action btn-setting btn btn-link">
                    <i class="fas fa-plus" />
                  </nuxt-link>
                </div>
                <users-search-form class="ml-sm-4" />
              </div>
              <div class="card-body">
                <users-table :users="users" @deleted="deleteUser" />
                <pagination :count="count" :value="page" :per-page="params.limit" @input="paginate" />
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import scrollIntoView from 'scroll-into-view'
import UsersSearchForm from '../../components/users-search-form'
import UsersTable from '../../components/users-table'
import Pagination from '../../components/pagination'

export default {
  components: { UsersSearchForm, UsersTable, Pagination },
  computed: {
    ...mapState('users', ['users', 'count']),
    ...mapGetters('users', ['page']),
    params () {
      return this.$store.state.users.params
    }
  },
  async fetch ({ store, query }) {
    // extract page from GET
    let page = parseInt(query.page || 1)
    if (!page || page < 0) {
      page = 1
    }
    // calc offset
    const limit = store.state.users.params.limit || 10
    const offset = (page - 1) * limit

    // extract search string from GET
    const email = (query.email || '').trim()

    // set vuex users params
    store.commit('users/setParams', { limit, offset, email })

    // run initial xhr
    await store.dispatch('users/loadUsers')
  },
  methods: {
    ...mapActions('users', ['loadUsers']),
    ...mapMutations('users', ['deleteUser', 'setParam', 'setParams']),

    scrollTop () {
      scrollIntoView(this.$el, {
        time: 200,
        align: {
          top: 0,
          topOffset: 55 // fixed header height
        }
      })
    },

    paginate (page) {
      this.setParam({ param: 'offset', value: (page - 1) * this.params.limit })
      this.scrollTop()

      // build query
      const query = Object.assign({}, this.$route.query)
      if (this.page > 1) {
        query.page = this.page
      } else {
        delete query.page
      }

      this.$router.replace({ name: this.$route.name, query })
      return this.loadUsers()
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
  @media (max-width: 575.98px) {
    .card-header {
      flex-wrap: wrap;
      .search-form {
        margin-top: 10px;
        width: 100%;
        .input-group-search {
          width: 100%;
          margin: 0;
        }
        .results {
          display: none;
        }
      }
    }
  }
}
</style>
