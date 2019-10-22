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
      users
    </div>
  </div>
</template>
