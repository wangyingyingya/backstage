<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item class="line" :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
<style scoped>
    .el-breadcrumb{
        height: 10px;
        padding: 15px;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    }
    .line{
        border-left:2px solid #31c17b ;
        padding-left:10px ;
    }
</style>