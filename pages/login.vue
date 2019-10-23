<template>
  <div class="container">
    <div class="justify-content-center row">
      <div class="col-md-8">
        <div class="card-group">
          <div class="p-4 card">
            <div class="card-body">
              <login-form />
            </div>
          </div>
          <div class="text-white bg-primary py-5 d-none d-lg-block card" style="width: 44%;">
            <div class="text-center card-body">
              <div>
                <h2>Sign up</h2>
                <p>Lorem ipsum dolor sit amet, consectetur</p>
                <a href="#">
                  <button tabindex="-1" class="mt-3 btn btn-primary active">Register Now!</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '../components/login-form'

export default {
  components: { LoginForm },
  head: {
    title: 'Login'
  },
  layout: 'auth',
  auth: 'guest'
}
</script>
