<template>
  <div id="top">
    <div v-for="(item,index) in shoplist" :key="index" class="car-box">
      <div class="car-left">
        <div class="mui-switch mui-switch-mini" :class="{'mui-active':value[index]}" @click="active(index)">
          <div class="mui-switch-handle"></div>
        </div>
      </div>
      <div class="car-middle">
        <img :src="item.thumb_path" alt="">
      </div>
      <div class="car-right">
        <p>{{item.title}}</p>
        <div class="money">
          <span>¥ {{item.sell_price}}</span>
          <div class="mui-numbox">
            <button class="mui-btn mui-btn-numbox-minus" type="button" @click="setNum(0,index)">-</button>
            <input class="mui-input-numbox" type="number" :value="item.cou">
            <button class="mui-btn mui-btn-numbox-plus" type="button" @click="setNum(1,index)">+</button>
          </div>
          <span>删除</span>
        </div>
      </div>
    </div>
    <div class="price">
      <div class="price-left">
        <p>总计(不含运费)</p>
        <p>已经勾选商品1件,总价为¥4444元</p>
      </div>
      <div class="price-right">
        <mt-button size="small" type="primary">删除全部数据</mt-button>
        <mt-button size="small" type="danger">去结算</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
// :class="{'mui-active':choose}" @click="choose"
import { Toast } from "mint-ui";
import { getObj, setLocal, getLocal } from "../../common/local";
import { vm } from "../../common/num";
export default {
  data() {
    return {
      obj: {},
      shoplist: [],
      num: 0,
      value: []  //存储单选按钮的值,用来设置类名是否添加
    };
  },
  created() {
    this.getidlist();
    this.getshoplist();
  },
  methods: {
    getidlist() {
      var arr = [];
      //获取localStroage里的值,组合成一个只有id和数量的对象,方便操作
      this.obj = getObj("shopcar");
    },
    getshoplist() {
      var url = this.Common.apidomain + "/api/goods/getshopcarlist/";
      for (var k in this.obj) {
        url += k + ",";
      }
      url = url.slice(0, url.length - 1);
      this.$http.get(url).then(res => {
        if (res.body.status != 0) {
          Toast("获取数据失败");
          return;
        }
        this.shoplist = res.body.message;
        //将单选按钮的类名值存储为false
        for (var i = 0; i < this.shoplist.length; i++) {
          this.value.push(false);
        }
        //将对象里的id对应的数量传递给商品列表里,方便v-for的操作
        this.shoplist.forEach((v, i) => {
          v.cou = this.obj[v.id];
        });
      });
    },
    //判断点击的按钮是加还是减,接收点击时传入的index值
    setNum(input, index) {
      //值是1为加,点击加一条数据进localStorage
      if (input == 1) {
        this.shoplist[index].cou++;
        var value = { shopid: this.shoplist[index].id, count: 1 };
        setLocal("shopcar", value);
        //为减,点击减一条数据localStorage
        //判断值为输入框值为0则不减
      } else if (this.shoplist[index].cou <= 0) {
        this.shoplist[index].cou = 0;
        //值不为零则可以减数据
      } else {
        this.shoplist[index].cou--;
        //遍历localStorage里的数组,符合id相同,值为1时,删除数组中的数据
        var arr = getLocal("shopcar");
        for (var i = arr.length - 1; i >= 0; i--) {
          if (arr[i].count == 1 && arr[i].shopid == this.shoplist[index].id) {
            arr.splice(i, 1);
            break;
            //遍历localStorage里的数组,符合id相同,值为大于1时,对应id的值减1
          } else if (
            arr[i].count > 1 &&
            arr[i].shopid == this.shoplist[index].id
          ) {
            arr[i].count -= 1;
            break;
          }
        }
        //最后把筛选后的数组添加进localStorage
        localStorage.setItem("shopcar", JSON.stringify(arr));
      }
      //设置APP.vue里的商品数量同步更新,非父子组件传值,每次点击加减按钮都自动传一次值
      this.num = 0;
      this.getnum();
      vm.$emit("key1", this.num);
    },
    //获取LocalStorage内的值,计算得出商品总数num的值
    getnum() {
      var arr = getLocal("shopcar");
      for (var i = 0; i < arr.length; i++) {
        this.num += arr[i].count;
      }
    }
    ,
    //点击相应的单选按钮,让按钮是否处于选中状态
    active(index) {
      this.value[index]=!this.value[index];
      console.log(this.value[index])
    }
  }
};
</script>
<style scoped>
.car-box {
  overflow: hidden;
  box-sizing: border-box;
  padding: 10px;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.car-left,
.car-middle,
.car-right {
  float: left;
}
.car-left {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.car-right {
  width: 60%;
}
.car-middle {
  width: 25%;
  margin-left: 15%;
  margin-top: 5px;
  box-sizing: border-box;
  padding: 5px;
}
.car-middle img {
  width: 100%;
}
.car-right p {
  color: #0094ff;
  font-size: 16px;
}
.money > span:first-child {
  font-size: 16px;
  color: red;
}
.money > span:last-child {
  font-size: 12px;
  margin-left: 5px;
  color: #0094ff;
}
.price {
  overflow: hidden;
  box-sizing: border-box;
  padding: 10px;
}
.price-left {
  font-size: 16px;
}
.price-right {
  float: right;
}
</style>
