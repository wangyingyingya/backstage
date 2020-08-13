<template>
    <div>
        <app-header></app-header>
        <app-navbar></app-navbar>
        <app-main></app-main>
    </div>
</template>

<script>
import AppHeader from './AppHeader'
import AppNavbar from './AppNavbar'
import AppMain from './AppMain'
export default {
    components:{
        AppHeader,
        AppNavbar,
        AppMain
    }
}
</script>

<style scoped>
    /* 头部 */
.header{
    position: absolute;
    line-height: 50px;
    top: 0;
    left: 0;
    right: 0;
    background-color: #2d3a4b;
}
.navbar{
    position: absolute;
    width: 230px;
    top: 49.6px;
    left: 0;
    bottom: 0;
    overflow-y: auto;  /* y轴滚动条 */
    background-color: #545c64;
}
.main{
    position: absolute;
    top: 49.6px ;
    left: 230px;
    right: 0;
    bottom: 0;
    padding: 10px;
    overflow-y:auto ;
    background-color: #fff;
}
</style>