<template>
	<view class="content">
		<input type="text" v-model="title" placeholder="反馈标题">
		<textarea cols="30" rows="10" v-model="content" placeholder="反馈内容"></textarea>
		<button @click="subFeedback">提交反馈</button>
	</view>
</template>

<script>
	import * as http from "../../utils/request.js"
	export default {
		data() {
			return {
				title: "",
				content: ""
			}
		},
		methods: {
			subFeedback() {
				http.http({
					url: "/prod-api/api/common/feedback",
					method: "post",
					data: {
						title: this.title,
						content: this.content
					}
				}).then((res) => {
					if (res.data.code !== 200) {
						uni.showToast({
							icon: "error",
							title: "反馈失败",
							duration: 1000
						})
					} else {
						uni.showToast({
							icon: "success",
							title: "反馈成功",
							duration: 1000,
							success() {
								setTimeout(() => {
									uni.navigateBack(1)
								}, 1100)
							}
						})
					}
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

	.content>* {
		width: 100%;
		height: 50px;
		margin-top: 1em;
	}

	.content>textarea {
		height: 300px;
	}

	.content>button {
		background-color: cornflowerblue;
		border-radius: 10px;
	}
</style>
