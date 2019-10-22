<template>
  <form>
    <h1>Login</h1>
    <p class="text-muted">
      Sign In to your account
    </p>
    <div class="mb-3 input-group">
      <div class="input-group-prepend">
        <span class="input-group-text"><i class="fas fa-user" /></span>
      </div>
      <input id="email" placeholder="E-mail" autocomplete="email" type="text" class="form-control">
    </div>
    <div class="mb-4 input-group">
      <div class="input-group-prepend">
        <span class="input-group-text"><i class="fas fa-lock" /></span>
      </div>
      <input id="password" placeholder="Password" autocomplete="current-password" type="password" class="form-control">
    </div>
    <div class="row">
      <div class="col-6">
        <button class="px-4 btn btn-primary">
          Login
        </button>
      </div>
      <div class="text-right col-6">
        <button class="px-0 btn btn-link">
          Forgot password?
        </button>
      </div>
    </div>
  </form>
</template>
