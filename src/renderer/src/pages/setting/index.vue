<template>
  <a-collapse :default-active-key="['1']">
    <a-collapse-item header="基础设置" key="1">
      <base-vue></base-vue>
    </a-collapse-item>
    <a-collapse-item header="翻译服务" key="2">
      <configure-vue></configure-vue>
    </a-collapse-item>
    <!-- <a-collapse-item header="插件市场" key="3">
      <div>即将上线</div>
    </a-collapse-item> -->
  </a-collapse>
</template>
<script setup lang="ts">
import configureVue from './configure.vue'
import baseVue from './base.vue'
</script>

<style scoped lang="scss"></style>
