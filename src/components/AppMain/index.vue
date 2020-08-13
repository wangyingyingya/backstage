<template>
  <div class="main">
      <!-- 注意link不能使用,因为他是内置的标签,要使用另外的名称,一般加上前缀 -->
    <app-link v-show="$route.path !== '/home'"></app-link>
    <router-view></router-view>
  </div>
</template>
<script>
import AppLink from './Link.vue'
export default {
    components:{AppLink}
}
</script>