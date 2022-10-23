<template>
	<!-- 暂时先显示信息 后续做一个if判断 弄修改框 -->
	<view class="content">
		<view class="details-items">
			<p class="item">头像</p>
			<img :src="getImg(detail.avatar)">
		</view>
		<view class="details-items">
			<p class="item">用户名</p>
			<text>{{detail.userName}}</text>
		</view>
		<view class="details-items">
			<p class="item">性别</p>
			<text>{{detail.sex == 0 ? "男" : "女"}}</text>
		</view>
		<view class="details-items">
			<p class="item">邮箱</p>
			<text>{{detail.email}}</text>
		</view>
		<view class="details-items">
			<p class="item">余额</p>
			<text>{{detail.balance}}元</text>
		</view>
		<view class="details-items">
			<p class="item">积分</p>
			<text>{{detail.score}}</text>
		</view>
		<view class="details-items">
			<p class="item">手机号码</p>
			<text>{{detail.phonenumber}}</text>
		</view>
		<view class="details-items">
			<p class="item">IDcard</p>
			<text>{{detail.idCard}}</text>
		</view>
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
		created() {
			const that = this
			http.http({
				url: "/prod-api/api/common/user/getInfo"
			}).then((res) => {
				that.detail = res.data.user
			})
		},
		methods: {

		}
	}
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		width: 90%;
		margin-left: 5%;
	}

	.details-items {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 50px;
		margin-top: 1em;
	}
</style>
