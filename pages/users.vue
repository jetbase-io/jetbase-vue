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
      <div class="animated fadeIn">
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
      </div>
    </div>
  </div>
</template>

<script>
import UsersTable from '../components/users-table'

export default {
  components: { UsersTable },
  data () {
    return {
      users: [
        {
          id: 1,
          username: 'cr7', // todo add to db
          first_name: 'Christiano',
          last_name: 'Ronaldo',
          email: 'ronaldo@gmail.com',
          role_id: 0
        }
      ]
    }
  }
}
</script>
