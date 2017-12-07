<template>
  <div class="box">
    <mt-swipe :auto="4000">
        <mt-swipe-item style="background:green;">1</mt-swipe-item>
        <mt-swipe-item style="background:yellow;">6</mt-swipe-item>
        <mt-swipe-item style="background:oranger;">7</mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui';
export default {

};
</script>

<style scoped>
    .box {
        width:100%;
        height: 100px;
        background-color: blue;
    }
</style>
