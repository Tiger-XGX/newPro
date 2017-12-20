<template>
  <div id="top">
    <ul class="mui-table-view mui-grid-view">
      <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for="(item,index) in lists" :key="index">
        <router-link v-bind="{to:'/goods/goodslist/goodsinfo/'+item.id}">
          <img class="mui-media-object" :src="item.img_url">
          <div class="mui-media-body g">
            <p v-text="item.title"></p>
            <div class="g-box">
              <div class="g-box-top">
                <span>¥{{item.market_price}}</span>
                <span style="text-decoration:line-through">¥{{item.sell_price}}</span>
              </div>
              <div class="g-box-bottom">
                <span>热卖中</span>
                <span>剩{{item.stock_quantity}}件</span>
              </div>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
    <mt-button size="large" type="danger" plain @click="getmore">点击加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      lists: [],
      num: 1
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    getlist() {
      var url = this.Common.apidomain + "/api/getgoods?pageindex=" + this.num;
      this.$http.get(url).then(res => {
        if (res.body.status != 0) {
          Tosat("获取数据失败");
          return;
        }
        if (this.num == 1) {
          this.lists = res.body.message;
        } else {
          this.lists = this.lists.concat(res.body.message);
        }
      });
    },
    getmore() {
      this.num++;
      this.getlist();
    }
  },
  components: {
    
  }
};
</script scoped>

<style>
.mui-table-view-cell.mui-media.mui-col-xs-6 {
  border: 1px solid grey;
  padding: 5px;
  margin-right: -1px;
  margin-top: 10px;
}
.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body.g {
  height: 115px;
}
.mui-table-view-cell > a:not(.mui-btn) {
  white-space: normal;
  margin: 0;
}
.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
  margin-top: 0px;
}
.mui-table-view.mui-grid-view .mui-table-view-cell > a:not(.mui-btn) {
  margin: 0;
}
.mui-media-body > p {
  font-size: 12px;
  color: black;
  line-height: 20px;
}
.g-box {
  box-sizing: border-box;
  padding: 10px 10px 2px 10px;
  background-color: rgba(0, 0, 0, 0.1);
  text-align: left;
}
.g-box span {
  font-size: 10px;
}
.g-box-top {
  margin-bottom: 10px;
}
.g-box-top span:first-child {
  color: red;
  margin-right: 15px;
  font-size: 14px;
}
.g-box-bottom {
  overflow: hidden;
}
.g-box-bottom span:last-child {
  float: right;
}
</style>
