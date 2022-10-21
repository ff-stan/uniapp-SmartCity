<template>
	<view class="content">
		<h2 class="title">用户登录</h2>
		<view class="fromBox">
			<input type="text" v-model="username" placeholder="请输入用户名">
			<input type="password" v-model="password" placeholder="请输入密码">
			<button type="submit" @click="login">登录</button>
		</view>
		<navigator class="regBut" url="../register/register">没有账号?前去注册...</navigator>
	</view>
</template>

<script>
	import * as http from "../../utils/request.js"
	export default {
		data() {
			return {
				username:"",
				password:""
			}
		},
		created() {
			
		},
		methods: {
			// 登录 请求登录api
			login() {
				uni.request({
					url:"http://124.93.196.45:10001/prod-api/api/login",
					data:{"username":this.username,"password":this.password},
					method:"POST",
					success: (res) => {
						if(res.data.code != 200){
							uni.showToast({
								icon:"error",
								title:"登录失败",
								success: () => {
									setTimeout(() => {uni.hideToast()} , 1000)
								}
							})
						}else{
							uni.setStorageSync("token",res.data.token)
							console.log(res)
						}
					}
				})
			}
		}
	}
</script>

<style scoped> 
.content {
	width: 100%;
	height: 300px;
	position: relative;
}
.title {
	text-align: center;
	margin-top: 1em;
}
.fromBox {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
}
.fromBox > input,button {
	flex: 1;
	height: 50px;
	margin: 2em 3em 0 3em;
	padding-left: 2em;
	background-color: #aaffff;
	border-radius: 1em;
}
.fromBox > button{
	text-align: center;
	padding-left: 0;
}
.regBut {
	position: absolute;
	right: 5em;
	font-size: .8em;
	color: cadetblue;
}
</style>
