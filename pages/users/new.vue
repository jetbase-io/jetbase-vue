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
        <li class="active breadcrumb-item" aria-current="page">New User</li>
      </ol>
    </nav>

    <div class="container-fluid">
      <transition name="fade" appear>
        <div class="row">
          <div class="col-lg-6">
            <user-card-form />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import UserCardForm from '../../components/user-card-form'

export default {
  components: { UserCardForm }
}
</script>
