<template>
  <div class="green">{{msg2}}</div>
</template>
<script>
    export default{
        data(){
            return {
                msg2: "这是注册页面"
            }
        }
    }
</script>
<style scoped>
    .green {
        font: weight 16px "微软雅黑";
        color: green;
    }
</style>