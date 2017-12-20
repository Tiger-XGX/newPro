<template>
    <mt-swipe :auto="2000">
        <mt-swipe-item v-for="(item,index) in lists" :key="index">
            <img :src="item.img" v-if="isshow">
            <img :src="item.src" v-if="!isshow">
        </mt-swipe-item>
    </mt-swipe>
</template>

<script>
export default {
  data() {
    return {
      lists: [],
      isshow: false
    };
  },
  props: ["id"],
  created() {
    this.getimgs();
  },
  methods: {
    getimgs() {
      var str = "/api/getlunbo";
      if (this.id == str) {
        this.isshow = !this.isshow;
      }
      var url = this.Common.apidomain + this.id;
      this.$http.get(url).then(function(response) {
        var data = response.body;
        if (data.status != 0) {
          Toast(data.message);
          return;
        }
        this.lists = data.message;
      });
    }
  },
  components: {}
};
</script scoped>

<style>
.mint-swipe {
  height: 214px;
}
.mint-swipe-item img {
  width: 100%;
  height: 214px;
}
.mint-swipe-item {
  background-color: #fff;
  width: 100%;
  height: 100%;
}
</style>
