<template>
  <div class="cmt">
    <h4>提交评论</h4>
    <p class="p"></p>
    <textarea placeholder="请输入评论内容..." v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="sub">提交评论</mt-button>
    <div class="comment">
      <div class="com-top">
        <h4>评论内容</h4>
        <p class="p"></p>
      </div>
      <div v-for="(list,index) in lists" :key="index">
        <div class="com-bottom">
          <span>用户:{{list.user_name}}</span>
          <span>发表时间:{{list.add_time | datafmt}}</span>
          <span>第{{index+1}}楼</span>
        </div>
        <ul class="mui-table-view">
          <li class="mui-table-view-cell" v-text="list.content"></li>
        </ul>
      </div>
      <mt-button size="large" type="danger" plain @click="getmore">点击加载更多</mt-button>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      msg: "",
      lists: [],
      num: 1
    };
  },
  props: ["id"],
  created() {
    this.loadMsg();
  },
  methods: {
    sub() {
      var url = this.Common.apidomain + "/api/postcomment/" + this.id;
      if (this.msg.trim() == "") {
        Toast("评论内容不能不空");
        return;
      }
      this.$http
        .post(url, { content: this.msg }, { emulateJSON: true })
        .then(res => {
          Toast(res.body.message);
        });
      this.msg = "";
     setTimeout(this.loadMsg(),200)
    },
    loadMsg() {
      var url =
        this.Common.apidomain +
        "/api/getcomments/" +
        this.id +
        "?pageindex=" +
        this.num;
      this.$http.get(url).then(res => {
        if (res.body.status != 0) {
          Toast("数据获取失败!");
          renturn;
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
      this.loadMsg();
    }
  }
};
</script scoped>

<style>
.cmt {
  padding: 5px;
}
.p {
  height: 1px;
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
}
h4 {
  color: #0094ff;
}
textarea {
  font-size: 12px;
}
.comment {
  margin-top: 10px;
}
.com-bottom {
  font-size: 12px;
  background-color: rgba(0, 0, 0, 0.2);
}
.com-bottom > span {
  margin-left: 10px;
}
.com-bottom > span:nth-of-type(3) {
  float: right;
}
</style>
