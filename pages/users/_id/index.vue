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
        <li class="breadcrumb-item">
          <nuxt-link :to="{name:'users'}">
            Users
          </nuxt-link>
        </li>
        <li class="active breadcrumb-item" aria-current="page">
          User Details
        </li>
      </ol>
    </nav>

    <div class="container-fluid">
      <transition name="fade" appear>
        <div class="row">
          <div class="col-lg-6">
            <user-card :user="user" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import UserCard from '../../../components/user-card'

export default {
  components: { UserCard },
  data () {
    return {
      user: {
        id: 1,
        first_name: null,
        last_name: null,
        email: null,
        role_id: null
      }
    }
  },
  async asyncData ({ store, app, params }) {
    const userId = parseInt(params.id)

    // try get user from vuex
    let user = store.getters['users/userById'](userId)

    // or from server
    if (!user) {
      user = await app.$api.get('users/' + userId)
    }

    return {
      user
    }
  }
}
</script>
