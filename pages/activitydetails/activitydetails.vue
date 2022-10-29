<template>
	<view class="content">
		<!-- 文章标题与图片 -->
		<view class="activity-img">
			<img :src="getImg(activity.imgUrl)" alt="">
		</view>
		<view class="activity-title">
			<h1>{{activity.name}}</h1>
			<p>报名数:{{activity.signupNum}}</p>
			<p>点赞:{{activity.likeNum}}</p>
			<p>发表日期:{{activity.publishTime}}</p>
		</view>
		<!-- 文章内容 -->
		<view class="activity-content" v-html="activity.content">

		</view>
		<!-- 评论区 -->
		<view class="comment-content">
			<h3>评论({{commentNum}})</h3>
			<view class="comment-item" v-for="item in comments">
				<p class="comment-item-title">{{item.userName}}:</p>
				<p class="comment-item-content">{{item.content}}</p>
				<p class="comment-item-time">{{item.commentDate}}</p>
			</view>
		</view>
		<!-- 新闻推荐 -->
		<view class="activity-item" v-for="n in topActivity" @click="goDetail" :data-id="n.id">
			<view class="activity-item-img">
				<img :src="getImg(n.imgUrl)">
			</view>
			<view class="activity-item-text">
				<h5>{{n.name}}</h5>
				<p>评论数:{{n.commentNum}}</p>
				<p>点赞数:{{n.likeNum}}</p>
				<p>阅读数:{{n.readNum}}</p>
				<p>发布时间:{{n.publishTime}}</p>
			</view>
		</view>
		<!-- 评论框 -->
		<view class="comment">
			<input type="text" placeholder="发表一条精彩的评论" v-model="comment">
			<button @click="setComment" class="comment-btn">发表</button>
			<!-- 判断是否已报名 -->
			<button @click="setSingo" :class="{'comment-btn' : true ,' comment-btn-active' : isSingo}" :disabled="isSingo">{{isSingo ? "已报名" : "报名"}}</button>
			<button @click="setLike">👍</button>
		</view>
	</view>
</template>

<script>
	import * as http from "../../utils/request.js"
	import * as isLogin from "../../utils/isLogin.js"
	export default {
		data() {
			return {
				id: "",
				activity: {},
				comment: "",
				isSingo: false,
				comments: [],
				commentNum: 0,
				topActivity: {},
				getImg: http.getImg
			}
		},
		onLoad(option) {
			// 接收上一个页面的传参
			this.id = option.activityId
			// 判断是否报名
			if(isLogin.isLogin()){
				http.http({
					url: "/prod-api/api/activity/signup/check",
					data: {
						activityId : this.id
					}
				}).then((res) => {
					if(res.data.msg == "已报名"){
						this.isSingo = true
					}
				})
			}
		},
		created() {
			const that = this
			// 获取对应id的活动详细内容
			http.http({
				url: "/prod-api/api/activity/activity/" + this.id
			}).then((res) => {
				that.activity = res.data.data
				uni.setNavigationBarTitle({
					title: that.activity.name
				})
				// 获取该活动的总评论数
				http.http({
					url : "/prod-api/api/activity/comment/number",
					data: {
						activityId: that.activity.id
					}
				}).then((res) => {
					that.commentNum = res.data.commentNum
				})
				// 获取该活动的评论内容
				http.http({
					url: "/prod-api/api/activity/comment/list",
					data: {
						activityId: that.activity.id
					}
				}).then((res) => {
					that.comments = res.data.rows
					// 按照id升序排序
					that.comments.sort((a, b) => {
						return a.id - b.id
					})
				})
				// 获取新闻推荐
				// top : "Y" 只会获取到被推荐的新闻 
				http.http({
					url: "/prod-api/api/activity/activity/list",
					data: {
						recommend: "Y",
						pageNum: "1",
						pageSize: "3"
					}
				}).then((res) => {
					that.topActivity = res.data.rows
				})
			})

		},
		updated() {
			// 数据更新后自动刷新评论区
			http.http({
				url: "/prod-api/api/activity/comment/list",
				data: {
					activityId: this.activity.id
				}
			}).then((res) => {
				this.comments = res.data.rows
				// 按照id升序排序
				this.comments.sort((a, b) => {
					return a.id - b.id
				})
			})
		},
		methods: {
			// 跳转到对应的详情页
			goDetail(e) {
				uni.navigateTo({
					url: "../activitydetails/activitydetails?activityId=" + e.currentTarget.dataset.id
				})
			},
			// 发表评论
			setComment() {
				// 判断是否登录
				if (isLogin.isLogin()) {
					// 判断评论不为空
					if (this.comment != "") {
						// 调用评论接口 
						http.http({
							url: "/prod-api/api/activity/comment",
							method: "post",
							data: {
								activityId: this.activity.id,
								content: this.comment
							}
						}).then((res) => {
							if (res.data.code == 200) {
								uni.showToast({
									icon: "success",
									title: "发表成功"
								})
								this.comment = ""
							}
						})
					} else {
						uni.showToast({
							icon: "error",
							title: "请输入内容"
						})
					}
				}
			},
			// 报名
			setSingo(e) {
				if(isLogin.isLogin()){
					http.http({
						url: "/prod-api/api/activity/signup",
						method: "post",
						data : {
							"activityId" : this.id
						}
					}).then((res) => {
						uni.showToast({
							icon:"success",
							title: "报名成功!"
						})
						this.isSingo = true
					})
				}
				
				
			},
			// 提交点赞
			setLike() {
				// 判断是否登录
				if (isLogin.isLogin()) {
					// 调用点赞接口
					http.http({
						url: "/prod-api/press/press/like/" + this.activity.id,
						method: "put"
					}).then((res) => {
						if (res.data.code == 200) {
							uni.showToast({
								icon: "success",
								title: "点赞成功"
							})
							this.comment = ""
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
		justify-content: center;
	}

	.activity-img {
		height: 200px;
		overflow: hidden;
	}

	.activity-title>h1 {
		margin-bottom: .5em;
	}

	.activity-title>p {
		font-size: .8em;
		text-align: right;
		color: darkgray;
	}

	/* 评论区 */
	.comment-content {}

	.comment-item {
		display: flex;
		flex-direction: column;
		background-color: #dfe6e9;
		border-radius: 10px;
		margin-bottom: .5em;
	}

	.comment-item-title {
		margin-bottom: .3em;
	}

	.comment-item-content {
		font-size: .8em;
		text-indent: 2em;
	}

	.comment-item-time {
		font-size: .8em;
		text-align: right;
	}

	/* 活动推荐 */
	.activity-item {
		display: flex;
		justify-content: space-between;
		margin-bottom: 3em;
	}

	.activity-item-img {
		width: 50%;
		overflow: hidden;
	}

	.activity-item-img>img {
		width: 100%;
		height: 100%;
		object-fit: fill;
	}

	.activity-item-text {
		width: 45%;
	}

	.activity-item-text>p {
		font-size: .5em;
		text-align: right;
		color: #644b4c;
	}

	/* 评论框 */
	.comment {
		display: flex;
		justify-content: space-between;
		width: 100%;
		position: fixed;
		bottom: 0;
	}

	.comment>input {
		flex: 60%;
		height: 3em;
		text-indent: 2em;
		background-color: #e7e8e8;
		border-radius: 5px;
	}

	.comment-btn {
		flex: 20%;
	}
	.comment-btn-active {
		flex: 30%;
	}
	.comment>button {
		border-radius: 5px;
	}
</style>
<style>
	.activity-content img {
		width: 100vw;
	}
</style>
