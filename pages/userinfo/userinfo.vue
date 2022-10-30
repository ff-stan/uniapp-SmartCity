<template>
	<view class="content">
		<view class="details-items">
			<!-- 修改头像需要上传文件 比较繁琐 -->
			<p class="item">头像</p>
			<img :src="getImg(detail.avatar)">
		</view>
		<view class="details-items">
			<p class="item">用户名</p>
			<text>{{detail.userName}}</text>
		</view>
		<view class="details-items">
			<p class="item">昵称</p>
			<input type="text" v-model="detail.nickName" @blur="isChange = true">
		</view>
		<view class="details-items" @click="changeSex">
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
			<input type="text" v-model="detail.phonenumber" @blur="isChange = true">
		</view>
		<view class="details-items">
			<p class="item">IDcard</p>
			<text>{{detail.idCard}}</text>
		</view>
		<view class="details-items changebtn" v-show="isChange">
			<button @click="change">修改</button>
		</view>
	</view>
</template>

<script>
	import * as http from "../../utils/request.js"
	export default {
		data() {
			return {
				detail: [],
				itemList: ['男', '女'],
				isChange: false,
				getImg: http.getImg
			}
		},
		created() {
			// 获取用户信息
			const that = this
			http.http({
				url: "/prod-api/api/common/user/getInfo"
			}).then((res) => {
				that.detail = res.data.user
			})
		},
		updated() {

		},
		methods: {
			// 修改性别
			changeSex() {
				const that = this
				// 弹出提示框 0男 1女
				uni.showActionSheet({
					itemList: this.itemList,
					success: function(res) {
						// 成功时将修改成被选择的下标
						that.detail.sex = res.tapIndex
						that.isChange = true
					},
					fail: function(res) {
						console.log(res.errMsg)
					}
				})
			},
			change() {
				// 调用修改接口
				http.http({
					url: "/prod-api/api/common/user",
					method: "put",
					data: {
						"nickName": this.detail.nickName,
						"sex": this.detail.sex,
						"phonenumber": this.detail.phonenumber
					}
				}).then((res) => {
					uni.showToast({
						icon: "success",
						title: "修改成功",
						// 成功后刷新信息
						success() {
							const that = this
							http.http({
								url: "/prod-api/api/common/user/getInfo"
							}).then((res) => {
								that.detail = res.data.user
							})
						}
					})
				})
			}
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

	.details-items>input {
		text-align: right;
	}

	.details-items>button {
		width: 100%;
	}
</style>
