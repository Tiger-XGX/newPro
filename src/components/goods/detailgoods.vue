<template>
  <div id="top">
    <div class="d-g-box">
      <p>{{lists.title}}</p>
      <p></p>
      <div v-html="lists.content" class="d-g-bottom"></div>
    </div>

  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      id: 0,
      lists: []
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getlist();
  },
  methods: {
    getlist() {
      var url = this.Common.apidomain + "/api/goods/getdesc/" + this.id;
      this.$http.get(url).then(res => {
        if (res.body.status != 0) {
          Tosat("获取数据失败");
          return;
        }
        this.lists = res.body.message[0];
      });
    }
  }
};
</script scoped>

<style>
.d-g-box {
  padding: 5px;
}
.d-g-box > p:first-child {
  color: #0094ff;
  font-size: 18px;
  font-weight: bold;
}
.d-g-box > p:nth-of-type(2) {
  height: 1px;
  border: 1px solid rgba(0, 0, 0, 0.2);
}
.d-g-bottom p {
  margin-bottom: 0;
}
.d-g-bottom img {
  display: block;
  width: 100% !important;
  
}
</style>
