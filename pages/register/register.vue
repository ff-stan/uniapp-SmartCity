<template>
	<view class="content">
		<h2 class="title">用户注册</h2>
		<view class="fromBox">
			<input type="text" v-model="username" placeholder="请输入用户名">
			<input type="password" v-model="password" placeholder="请输入密码">
			<input type="password" v-model="phonenumber" placeholder="请输入手机号码">
			<radio-group @change="radioChange">
				<label class="radio">
					<radio value="0" /><text>男</text>
				</label>
				<label class="radio">
					<radio value="1" /><text>女</text>
				</label>
			</radio-group>
			<button type="submit" @click="register">注册</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: "",
				password: "",
				phonenumber: "",
				sex: ""
			}
		},
		methods: {
			// 注册 请求注册api   
			register() {
				uni.request({
					url: "http://124.93.196.45:10001/prod-api/api/register",
					data: {
						"userName": this.username,
						"password": this.password,
						"sex": this.sex,
						"phonenumber": this.phonenumber
					},
					method: "POST",
					success: (res) => {
						if (res.data.code != 200) {
							uni.showToast({
								icon: "error",
								title: "注册失败",
								success: () => {
									setTimeout(() => {
										uni.hideToast()
									}, 1000)
								}
							})
						} else {
							uni.showToast({
								icon: "error",
								title: "注册成功",
								success: () => {
									setTimeout(() => {
										uni.hideToast()
										uni.navigateTo({
											url: "/pages/login/login"
										})
									}, 1000)
								}
							})
						}
					}
				})
			},
			// 单选按钮改变
			radioChange(el) {
				this.sex = el.target.value
			}
		}
	}
</script>

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

	.fromBox>input,
	button {
		flex: 1;
		height: 50px;
		margin: 2em 3em 0 3em;
		padding-left: 2em;
		background-color: #aaffff;
		border-radius: 1em;
	}

	.fromBox>button {
		text-align: center;
		padding-left: 0;
	}

	.fromBox>radio-group {
		flex: 1;
		height: 30px;
		margin: 2em 0 0 3em;
	}
</style>
