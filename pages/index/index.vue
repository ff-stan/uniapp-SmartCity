<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<navigator url="../login/login">登录</navigator>
		</view>
	</view>
</template>

<script>
	import * as http from "../../utils/request.js"
	export default {
		data() {
			return {
				
			}
		},
		created() {
			// 检测是否登录
			uni.getStorage({
				key:"token",
				fail() {
					uni.navigateTo({url:"/pages/login/login"})
				}
			})
		},
		onLoad() {
			http.http({
				url:"/prod-api/api/common/user/getInfo",
			}).then((res) => console.log(res))
		},
		methods: {
			
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
