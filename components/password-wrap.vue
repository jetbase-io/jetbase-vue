<template>
  <div class="form-control-wrap password-wrap">
    <slot />
    <button
      type="button"
      class="btn-icon password-eye text-muted"
      :aria-label="visible ? 'Hide password' : 'Show password'"
      tabindex="-1"
      @click="$emit('update:visible', !visible)"
    >
      <i class="far" :class="visible ? 'fa-eye' : 'fa-eye-slash'" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.password-wrap {
  position: relative;
  .password-eye {
    top: 0;
    right: 0;
    line-height: 1;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(1.5em + 0.75rem);
    width: calc(1.5em + 0.75rem);
  }
  .form-control {
    padding-right: calc(1.5em + 0.75rem);
  }
}
</style>
