<template>
  <div id="top">
    <comment :id="id"></comment>
  </div>
</template>

<script>
import comment from "../subcom/comment.vue";
export default {
  data() {
    return {
      id: 0
    };
  },
  created() {
    this.id = this.$route.params.id;
  },
  components: {
    comment
  }
};
</script scoped>

<style>

</style>
