<template>
    <div id="top">
        <lg-preview></lg-preview>
        <div class="dp-box">
            <p>{{lists.title}}</p>
            <span class="dp-left">{{lists.add_time | datafmt}}</span>
            <span class="dp-right">{{lists.click}}次浏览</span>
        </div>
        <p class="dp-line"></p>
        <ul class="mui-table-view mui-grid-view mui-grid-9 dp-ul">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-for="(item,index) in photos" :key="index">
                <img :src="item.src" v-preview="item.src">
            </li>
            <p v-html="lists.content"></p>
        </ul>
        <comment :id="id"></comment>
    </div>
</template>

<script>
import comment from "../subcom/comment.vue";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      lists: {},
      photos: [],
      id: 0
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getlist();
    this.getphoto();
  },
  methods: {
    getlist() {
      var url = this.Common.apidomain + "/api/getimageInfo/" + this.id;
      this.$http.get(url).then(res => {
        if (res.body.status != 0) {
          Tosat("获取数据失败");
          return;
        }
        this.lists = res.body.message[0];
      });
    },
    getphoto() {
      var url = this.Common.apidomain + "/api/getthumimages/" + this.id;
      this.$http.get(url).then(res => {
        if (res.body.status != 0) {
          Tosat("获取数据失败");
          return;
        }
        this.photos = res.body.message;
      });
    }
  },
  components: {
    comment
  }
};
</script scoped>

<style>
.dp-box {
  padding: 5px;
  font-size: 12px;
}
.dp-box p {
  color: blue;
  font: bold 14px "微软雅黑";
}
.dp-line {
  height: 1px;
  border: 1px solid grey;
}
.dp-right {
  float: right;
}
.dp-ul img {
  width: 70px;
  height: 70px;
}
.dp-ul p {
  text-indent: 2em;
  font-size: 12px;
}
</style>
