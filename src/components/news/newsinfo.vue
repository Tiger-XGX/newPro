<template>
 <div id="top">
     <div class="header">
         <div class="title">
            <h4>{{list.title}}</h4> 
         </div>
         <div class="h-bottom">
             <span class="time">{{list.add_time | datafmt}}</span>
         </div>
     </div>
     <div class="content" v-html="list.content"></div>
 </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      id: 0
    };
  },
  created() {
    this.id = this.$route.params.name;
    this.$http.get("http://vue.studyit.io/api/getnew/" + this.id).then(res => {
        if(res.body.status!=0){
            alert("获取数据失败");
            return;
        }
      this.list = res.body.message[0];
    });
  },
  components: {}
};
</script scoped>

<style>
.title {
  color: #0094ff;
  padding: 5px;
}
.time {
  font-size: 14px;
  color: grey;
  margin-left:10px;
}
.content {
    padding: 5px;
}
</style>
