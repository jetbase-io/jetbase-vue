<template>
  <client-only v-if="pagesCount > 1">
    <paginate
      :value="value"
      :page-count="pagesCount"
      prev-text="«"
      next-text="»"
      container-class="pagination"
      page-class="page-item"
      prev-class="page-item"
      next-class="page-item"
      page-link-class="page-link"
      prev-link-class="page-link"
      next-link-class="page-link"
      @input="$emit('input', $event)"
    />
  </client-only>
</template>

<script>
const Paginate = () => import('vuejs-paginate' /* webpackChunkName: "vuejs-paginate" */).then(m => m.default || m)

export default {
  components: { Paginate },
  props: {
    value: {
      type: Number,
      default: 1
    },
    count: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      default: 10
    }
  },
  computed: {
    pagesCount () {
      return Math.ceil(this.count / this.perPage)
    }
  }
}
</script>
