<script setup lang="ts">
import { withBase } from 'vitepress'
</script>

<template>
  <div class="not-found-page">
    <div class="not-found-inner">
      <p class="not-found-code">404</p>
      <h1>页面未找到</h1>
      <p class="not-found-desc">
        你访问的页面不存在，或者链接已经发生变化。
      </p>
      <div class="not-found-links">
        <a :href="withBase('/')">返回首页</a>
        <a :href="withBase('/notes/')">学习笔记</a>
        <a :href="withBase('/tools/')">工具使用</a>
        <a :href="withBase('/cases/')">实践案例</a>
        <a :href="withBase('/guide/maintenance.html')">维护指南</a>
      </div>
    </div>
  </div>
</template>
