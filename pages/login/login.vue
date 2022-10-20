<template>
	<view>
		<input type="text" v-model="username">
		<input type="safe-password" v-model="password">
		<button type="submit" @click="login">登录</button>
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
		methods: {
			login() {
				uni.request({
					url:"/prod-api/api/login",
					data:{"username":this.username,"password":this.password},
					method:"POST",
					success: (res) => {
						uni.setStorageSync("token",res.data.token)
					}
				})
			}
		}
	}
</script>

<style>

</style>
