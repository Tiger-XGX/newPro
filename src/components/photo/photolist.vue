<template>
    <div id="top">
        <ul class="list">
            <li @click="choosePhoto(0)">全部</li>
            <li @click="choosePhoto(item.id)" v-for="(item,index) in lists" :key="index">{{item.title}}</li>
        </ul>
        <ul class="photo">
            <li v-for="(item,photoIndex) in photoList" :key="photoIndex">
                <router-link v-bind="{to:'/photo/photolist/detailphoto/'+item.id}">
                    <img v-lazy="item.img_url" :title="item.title">
                </router-link>
                <div class="box">
                    <p class="p-title">{{item.title}}</p>
                    <p class="shade">{{item.zhaiyao}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      lists: [],
      photoList: [],
      id: 0
    };
  },
  created() {
    this.getlist();
    this.getPhoto();
  },
  methods: {
    getlist() {
      var url = this.Common.apidomain + "/api/getimgcategory";
      this.$http.get(url).then(res => {
        if (res.body.status != 0) {
          Tosat("获取数据失败");
          return;
        }
        this.lists = res.body.message;
      });
    },
    getPhoto() {
      var url = this.Common.apidomain + "/api/getimages/" + this.id;
      this.$http.get(url).then(res => {
        if (res.body.status != 0) {
          Tosat("获取数据失败");
          return;
        }
        this.photoList = res.body.message;
      });
    },
    choosePhoto(input) {
      this.id = input;
      this.getPhoto();
    }
  },
  components: {}
};
</script scoped>

<style>
ul {
  list-style: none;
  padding: 5px;
  font-size: 14px;
  color: #0094ff;
  overflow: hidden;
}
.list li {
  float: left;
  margin: 5px 5px;
}
.photo img {
  display: block;
  width: 100%;
  height: 300px;
}
.box {
  background-color: black;
  opacity: 0.7;
  position: absolute;
  bottom: 0px;
}
.box > p {
  color: white;
  margin-bottom: 0;
  font-size: 8px;
}
.shade {
  text-indent: 2em;
}
.p-title {
  text-align: center;
  font: bold 12px "微软雅黑";
  line-height: 18px;
}
.photo > li {
  position: relative;
}
image[lazy="loading"] {
  width: 40px;
  height: 300px;
  margin: auto;
}
</style>
