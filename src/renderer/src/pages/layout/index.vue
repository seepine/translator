<template>
  <div class="container">
    <navbar-vue class="nav"></navbar-vue>
    <div class="body px-sm pb-sm">
      <router-view> </router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import navbarVue from './navbar.vue'
</script>
<style lang="scss">
.container {
  overflow: hidden;
  border: 1px solid rgba(var(--gray-3), 0.6);
  border-radius: 12px;
  background-color: transparent;
}
.nav,
.body {
  background-color: #ffffff !important;
}
.arco-collapse-item-header {
  line-height: 20px !important;
  border-bottom: unset !important;
  background-color: #f1f1f1 !important;
}

.arco-collapse-item-content {
  padding-left: 13px !important;
  background-color: #f6f6f6 !important;
}
.arco-textarea-wrapper {
  background-color: #f6f6f6 !important;
  border: unset !important;
}
body[arco-theme='dark'] {
  .nav,
  .body {
    background-color: #333434 !important;
  }
  .arco-collapse-item-header {
    background-color: #212222 !important;
  }

  .arco-tooltip-content,
  .arco-tooltip-popup-arrow {
    background-color: rgb(71, 71, 73);
  }
  .arco-collapse-item-content,
  .arco-textarea-wrapper {
    background-color: #252626 !important;
  }
}

.arco-collapse {
  border: unset !important;
}
.arco-collapse-item {
  margin-top: 10px;
  border-bottom: unset !important;
  .logo {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
}
.arco-collapse-item:first-child {
  margin-top: 0;
}
</style>
