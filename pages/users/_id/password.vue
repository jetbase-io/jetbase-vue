<template>
  <div>
    <!--breadcrumb-->
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <nuxt-link :to="{name:'index'}">Dashboard</nuxt-link>
        </li>
        <li class="breadcrumb-item">
          <nuxt-link :to="{name:'users'}">Users</nuxt-link>
        </li>
        <li class="active breadcrumb-item" aria-current="page">Change Password</li>
      </ol>
    </nav>

    <div class="container-fluid">
      <transition name="fade" appear>
        <div class="row">
          <div class="col-lg-6">
            <password-form :user="user" @changed="$router.back()" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import PasswordForm from '../../../components/user-password-form'
import UserIdPage from '../../../components/user-id-page'

export default {
  components: { PasswordForm },
  extends: UserIdPage
}
</script>
