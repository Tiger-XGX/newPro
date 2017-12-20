<!-- 以后项目的根组件 -->
<template>
	<div>
		<mt-header fixed title="购物车"></mt-header>
		<router-view></router-view>
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/tabbar-with-chat">
				<span class="mui-icon mui-icon-email"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar">
				<span class="mui-icon mui-icon-contact">
					<span class="mui-badge" id="value">{{num}}</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/tabbar-with-map">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
	</div>
</template>

<script>
import {vm} from "./common/num";
import {getLocal} from "./common/local"
//非父子组件接收值(通过事件),接收加入购物车页面的num值
vm.$on("key",function(input){
		var span=document.querySelector("#value");
		span.innerText=+span.innerText+input;
});
//非父子组件接收值(通过事件),接收购物车内传入的num值
vm.$on("key1",function(input){
		var span=document.querySelector("#value");
		span.innerText=input;
});
export default {
  data() {
    return {
			num:0
		};
	},
	created(){
		this.getnum();
	},
	methods:{
		getnum(){
			var arr=getLocal("shopcar");
			for(var i=0;i<arr.length;i++){
				this.num+=arr[i].count;
			}
		}
	}
};
</script>

<style scoped>

</style>