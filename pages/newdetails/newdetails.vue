<template>
	<view class="content">
		<!-- 文章标题与图片 -->
		<view class="news-img">
			<img :src="getImg(news.cover)" alt="">
		</view>
		<view class="news-title">
			<h1>{{news.title}}</h1>
			<p>阅读数:{{news.readNum}}</p>
			<p>点赞:{{news.likeNum}}</p>
			<p>发表日期:{{news.publishDate}}</p>
		</view>
		<!-- 文章内容 -->
		<view class="news-content" v-html="news.content">

		</view>
		<!-- 评论区 -->
		<view class="comment-content">
			<h3>评论({{news.commentNum}})</h3>
			<view class="comment-item" v-for="item in comments">
				<p class="comment-item-title">{{item.userName}}:</p>
				<p class="comment-item-content">{{item.content}}</p>
				<p class="comment-item-time">{{item.commentDate}}</p>
			</view>
		</view>
		<!-- 新闻推荐 -->
		<view class="new-item" v-for="n in topNews" @click="goDetail" :data-id="n.id">
			<view class="new-item-img">
				<img :src="getImg(n.cover)">
			</view>
			<view class="new-item-text">
				<h5>{{n.title}}</h5>
				<p>评论数:{{n.commentNum}}</p>
				<p>点赞数:{{n.likeNum}}</p>
				<p>阅读数:{{n.readNum}}</p>
				<p>发布时间:{{n.publishDate}}</p>
			</view>
		</view>
		<!-- 评论框 -->
		<view class="comment">
			<input type="text" placeholder="发表一条精彩的评论" v-model="comment">
			<button @click="setComment" class="comment-btn">发表</button>
			<button @click="setLike">👍</button>
		</view>
	</view>
</template>

<script>
	import * as http from "../../utils/request.js"
	export default {
		data() {
			return {
				id: "",
				news: {},
				comment: "",
				comments: [],
				topNews: {},
				getImg: http.getImg
			}
		},
		onLoad(option) {
			this.id = option.newsId
		},
		created() {
			const that = this
			// 获取对应id的新闻详细内容
			http.http({
				url: "/prod-api/press/press/" + this.id
			}).then((res) => {
				that.news = res.data.data
				// 获取该新闻的评论内容
				http.http({
					url: "/prod-api/press/comments/list",
					data: {
						newsId: that.news.id
					}
				}).then((res) => {
					that.comments = res.data.rows
				})
				// 获取新闻推荐
				// top : "Y" 只会获取到被推荐的新闻 
				http.http({
					url: "/prod-api/press/press/list",
					data: {
						top: "Y",
					}
				}).then((res) => {
					that.topNews = res.data.rows
				})
			})

		},
		updated() {
			// 数据更新后自动刷新评论区
			http.http({
				url: "/prod-api/press/comments/list",
				data: {
					newsId: this.news.id
				}
			}).then((res) => {
				this.comments = res.data.rows
			})
		},
		methods: {
			// 跳转到对应的详情页
			goDetail(e) {
				uni.navigateTo({
					url: "../newdetails/newdetails?newsId=" + e.currentTarget.dataset.id
				})
			},
			// 发表评论
			setComment() {
				// 判断是否登录
				if (!uni.getStorageSync('token')) {
					uni.showToast({
						icon: "error",
						title: "请先登录!",
						success() {
							uni.navigateTo({
								url: "../login/login"
							})
						}
					})
				} else {
					if (this.comment != "") {
						http.http({
							url: "/prod-api/press/pressComment",
							method: "post",
							data: {
								newsId: this.news.id,
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
			// 提交点赞
			setLike() {
				// 判断是否登录
				if (!uni.getStorageSync('token')) {
					uni.showToast({
						icon: "error",
						title: "请先登录!",
						success() {
							uni.navigateTo({
								url: "../login/login"
							})
						}
					})
				} else {
					http.http({
						url: "/prod-api/press/press/like/" + this.news.id,
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

	.news-img {
		height: 200px;
		overflow: hidden;
	}

	.news-title>h1 {
		margin-bottom: .5em;
	}

	.news-title>p {
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

	/* 新闻推荐 */
	.new-item {
		display: flex;
		justify-content: space-between;
		margin-bottom: 3em;
	}

	.new-item-img {
		width: 50%;
		overflow: hidden;
	}

	.new-item-img>img {
		width: 100%;
		height: 100%;
		object-fit: fill;
	}

	.new-item-text {
		width: 45%;
	}

	.new-item-text>p {
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
		flex: 80%;
		height: 3em;
		text-indent: 2em;
		background-color: #e7e8e8;
		border-radius: 5px;
	}

	.comment-btn {
		flex: 20%;
	}

	.comment>button {
		border: 5px;
	}
</style>
<style>
	.news-content>p {
		text-indent: 2em;
	}
</style>
