<template>
  <div id="top">
    <div class="g-s">
      <slider :id="'/api/getthumimages/'+id"></slider>
    </div>
    <div class="g-s">
      <p>{{lists.title}}</p>
      <p class="g-line"></p>
      <div class="g-top">
        <span>市场价
          <s>¥{{lists.market_price}}</s>
        </span>
        <span>销售价
          <i>¥{{lists.sell_price}}</i>
        </span>
      </div>
      <div class="g-main">
        购买数量: <input type="button" value="-" @click="num<=0?num=0:num--">
        <input type="text" v-model="num" class="input" disabled="disabled">
        <input type="button" value="+" @click="num++">
      </div>
      <div class="g-bottom">
        <mt-button size="small" type="primary">立即购买</mt-button>
        <mt-button size="small" type="danger" @click="addshop">加入购物车</mt-button>
      </div>
    </div>
    <div class="g-s">
      <p>商品参数</p>
      <p class="g-line"></p>
      <div class="g-param">
        <ul>
          <li>商品货号:{{lists.goods_no}}</li>
          <li>库存情况:{{lists.stock_quantity}}</li>
          <li>上架时间:{{lists.add_time | datafmt}}</li>
        </ul>
      </div>
    </div>
    <div class="g-s">
      <router-link v-bind="{to:'/goods/goodslist/goodsinfo/'+id+'/detailgoods'}">
        <mt-button type="primary" size="large" plain>图文介绍</mt-button>
      </router-link>
      <router-link v-bind="{to:'/goods/goodslist/goodsinfo/'+id+'/commentgoods'}">
        <mt-button type="danger" size="large" plain>商品评论</mt-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import slider from "../subcom/slider.vue";
import { vm } from "../../common/num";
import {setLocal} from "../../common/local"
export default {
  data() {
    return {
      id: 0,
      name: "/api/getthumimages/",
      lists: {},
      num: 1
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getlist();
  },
  methods: {
    getlist() {
      var url = this.Common.apidomain + "/api/goods/getinfo/" + this.id;
      this.$http.get(url).then(res => {
        if (res.body.status != 0) {
          Toast("获取数据失败");
          return;
        }
        this.lists = res.body.message[0];
      });
    },
    addshop() {
      if(this.num==0){
        Toast("数量不能为0");
        return;
      }
      var value={shopid:this.id,count:this.num};
      //非父子组件之间传值
      vm.$emit("key", this.num);
      Toast("商品添加成功!");
      //点击添加商品后同时在localStorage里存储值(字符串格式)
      setLocal("shopcar",value);
      this.num = 0;
    }
  },
  components: {
    slider
  }
};
</script scoped>

<style>
.g-s {
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  padding: 10px;
  margin: 5px;
}
.g-s > p:first-child {
  color: #0094ff;
  font-size: 16px;
  font-weight: bold;
}
.g-line {
  height: 1px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.g-top,
.g-main {
  font-size: 12px;
}
.g-top > span:last-child {
  margin-left: 20px;
}
.g-top > span:last-child > i {
  color: red;
  font-size: 20px;
}
.g-main {
  vertical-align: middle;
  margin-top: 15px;
}
.g-main > .input {
  width: 50px;
  height: 33px;
}
.g-param ul {
  box-sizing: border-box;
  padding-left: 20px;
  color: black;
}
.mint-button--primary.is-plain {
  margin-bottom: 25px;
}
</style>
