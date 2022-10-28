<template>
	<view v-if="detail">
		<!-- 顶部信息缩略 -->
		<view class="user">
			<view class="user-img">
				<img :src="getImg(detail.avatar)">
			</view>
			<view class="user-text">
				<h2>{{detail.userName}}</h2>
				<p>{{detail.email}}</p>
			</view>
		</view>
		<!-- 功能模块 -->
		<view class="detail-jump">
			<view class="detail-jump-item" hover-class="detail-jump-selitem">
				<navigator url="../userinfo/userinfo" hover-class="none">用户信息</navigator>
			</view>
			<view class="detail-jump-item" hover-class="detail-jump-selitem">
				<navigator url="/pages/index/index" hover-class="none" open-type="switchTab">订单列表</navigator>
			</view>
			<view class="detail-jump-item" hover-class="detail-jump-selitem">
				<navigator url="../changepassword/changepassword" hover-class="none">修改密码</navigator>
			</view>
			<view class="detail-jump-item" hover-class="detail-jump-selitem">
				<navigator url="../feedback/feedback" hover-class="none">意见反馈</navigator>
			</view>
			<view class="detail-jump-item" hover-class="detail-jump-selitem" @click="loginout">
				<p>退出登录</p>
			</view>
		</view>
	</view>
	<view class="no-auth" v-else>
		未登录
		<navigator url="../login/login" open-type="redirect">请前往登录</navigator>
	</view>
</template>

<script>
	import * as http from "../../utils/request.js"
	export default {
		data() {
			return {
				detail: [],
				getImg: http.getImg
			}
		},
		// 每一次显示页面时触发
		onShow() {
			// 获取后发送数据
			const that = this
			http.http({
				url: "/prod-api/api/common/user/getInfo"
			}).then((res) => {
				that.detail = res.data.user
			})
		},
		created() {
			// 检测是否登录
			uni.getStorage({
				key: "token",
				fail() {
					uni.redirectTo({
						url: "/pages/login/login"
					})
				}
			})
		},
		methods: {
			// 退出登录 清空状态
			loginout: function() {
				uni.removeStorageSync("token")
				this.detail = []
				uni.switchTab({
					url: "/pages/index/index"
				})
			}
		}
	}
</script>

<style scoped>
	/* 顶部缩略信息 */
	.user {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 100px;
	}

	.user-img {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 40%;
		margin: 0 1em;
	}

	.user-img>img {
		width: 80px;
		height: 80px;
		border: 1px solid black;
		border-radius: 100%;
		overflow: hidden;
	}

	.user-text {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 60%;
	}

	.user-text>p {
		font-size: .8em;
		color: darkgray;
	}

	/* 跳转模块 */
	.detail-jump {
		display: flex;
		flex-direction: column;
		width: 80%;
		height: 300px;
		margin-left: 10%;
	}

	.detail-jump-item {
		flex: 1;
		margin-top: 1em;
		text-align: center;
		border: 1px solid black;
		border-radius: 10px;
		background-color: bisque;
	}

	.detail-jump-item>navigator,
	p {
		margin-top: .5em;
	}

	.detail-jump-selitem {
		background-color: chocolate;
	}

	.detail-jump-selitem:last-child {
		background-color: crimson;
	}
</style>
