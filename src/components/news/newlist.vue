<template>
  <div id="top">
        <ul class="mui-table-view">
			<li v-for="(list,index) in lists" :key="index" class="mui-table-view-cell mui-media">
				<router-link v-bind="{to:'/news/newsinfo/'+list.id}">
					<img class="mui-media-object mui-pull-left" :src="list.img_url">
					<div class="mui-media-body">
                        {{list.title}}
					    <p class='mui-ellipsis' v-text="list.zhaiyao"></p>
					</div>
                    <div>
                        <span class="time">发表时间:{{list.add_time | datafmt}}</span>
                        <span class="number">点击次数{{list.click}}</span>
                    </div>
				</router-link>
			</li>
		</ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lists: []
    };
  },
  created() {
    this.news();
  },
  methods: {
    news() {
      this.$http.get("http://vue.studyit.io/api/getnewslist").then(res => {
        if (res.body.status != 0) {
          alert("获取数据失败");
          return;
        }
        this.lists = res.body.message;
      });
    }
  }
};
</script>

<style scoped>
.mui-table-view .mui-media-object {
  line-height: 30px;
  max-width: 60px;
  height: 60px;
}
.time,
.number {
  font-size: 12px;
}
</style>
