<template>
	<!-- 后续做一下验证 当输入为空提交时输入框下会有红字提示 -->
	<view class="content">
		<input type="password" placeholder="原密码" v-model="password">
		<input type="password" placeholder="新密码" v-model="newpassword">
		<button @click="change">修改密码</button>
	</view>
</template>

<script>
	import * as http from "../../utils/request.js"
	export default {
		data() {
			return {
				password: "",
				newpassword: ""
			}
		},
		methods: {
			// 调用接口 修改密码
			change() {
				if (this.password != "" && this.newpassword != "") {
					http.http({
						url: "/prod-api/api/common/user/resetPwd",
						method: "put",
						data: {
							oldPassword: this.password,
							newPassword: this.newpassword
						}
					}).then((res) => {
						if (res.data.code !== 200) {
							uni.showToast({
								icon: "error",
								title: "修改失败",
								duration: 1000
							})
						} else {
							uni.showToast({
								icon: "success",
								title: "修改成功",
								duration: 1000,
								success() {
									setTimeout(() => {
										uni.navigateBack()
									}, 1100)
								}
							})
						}
					})
				}
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

	.content>* {
		width: 100%;
		height: 50px;
		margin-top: 1em;
	}

	.content>button {
		background-color: cornflowerblue;
		border-radius: 10px;
	}
</style>
