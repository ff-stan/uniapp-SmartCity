<template>
	<view class="content">
		<!-- 电影详情 -->
		<view class="movie-details">
			<view class="movie-details-img">
				<img :src="getImg(movieDetails.cover)">
			</view>
		</view>
		<!-- 评论区 -->
		<view class="comment-content" v-if="comments.length > 1">
			<h3>评论({{comments.length}})</h3>
			<view class="comment-item" v-for="item in comments">
				<p class="comment-item-title">{{item.userName}}:</p>
				<p class="comment-item-content" v-html="item.content"></p>
				<p class="comment-item-time">{{item.commentDate}}</p>
				<p @click="setLike" :data-id="item.id">👍</p>
			</view>
		</view>
		<!-- 评论框 -->
		<view class="comment">
			<input type="text" placeholder="发表一条精彩的评论" v-model="comment">
			<button @click="setComment" class="comment-btn">发表</button>
			<!-- 判断是否已报名 -->
			<button @click="setSingo" :class="{'comment-btn' : true ,' comment-btn-active' : isSingo}"
				:disabled="isSingo">{{isSingo ? "想看!" : "想看?"}}</button>
			<button @click="setSeen" :class="{'comment-btn' : true ,' comment-btn-active' : isSeen}"
				:disabled="isSeen">{{isSeen ? "看过!" : "看过?"}}</button>
		</view>
	</view>
</template>

<script>
	import * as http from "../../utils/request.js"
	import * as isLogin from "../../utils/isLogin.js"
	export default {
		data() {
			return {
				movieId: "",
				movieDetails: [],
				comment: "",
				comments: [],
				isSingo: false,
				isSeen: false,
				getImg: http.getImg
			}
		},
		onLoad(option) {
			this.movieId = option.id
		},
		created() {
			const that = this
			// 获取影片详情
			http.http({
				url: "/prod-api/api/movie/film/detail/" + this.movieId
			}).then((res) => {
				console.log(res)
			})
			// 获取影片影评
			http.http({
				url: "/prod-api/api/movie/film/comment/list",
				data: {
					movieId : this.movieId,
				}
			}).then((res) => {
				that.comments = res.data.rows
			})
		},
		methods: {
			// 发表评论
			setComment() {
				// 判断是否登录
				if (isLogin.isLogin()) {
					if (this.comment != "") {
						http.http({
							url: "/prod-api/api/movie/film/comment",
							method: "post",
							data: {
								movieId: this.movieId,
								content: this.comment
							}
						}).then((res) => {
								uni.showToast({
									icon: "success",
									title: "发表成功"
								})
								this.comment = ""
						})
					} else {
						uni.showToast({
							icon: "error",
							title: "请输入内容"
						})
					}
				}

			},
			// 添加想看
			setSingo(){
				if(isLogin.isLogin()){
					http.http({
						// 此接口有问题
						url: "/prod-api/api/movie/film/like/" + this.movieId,
						method: "post"
					}).then((res) => {
						uni.showToast({
							icon:"success",
							title: "已添加到想看!"
						})
						this.isSingo = true
					})
				}
			},
			// 添加看过
			setSeen(){
				if(isLogin.isLogin()){
					http.http({
						// 此接口有问题
						url: "/prod-api/api/movie/film/favorite/" + this.movieId,
						method: "post"
					}).then((res) => {
						uni.showToast({
							icon:"success",
							title: "已添加到看过!"
						})
						this.isSeen = true
					})
				}
			},
			// 提交点赞
			setLike(e) {
				// 判断是否登录
				if (isLogin.isLogin()) {
					// 该接口也寄了
					http.http({
						url: "/prod-api/api/movie/film/comment/like/" + e.currentTarget.dataset.id,
						method: "POST"
					}).then((res) => {
							uni.showToast({
								icon: "success",
								title: "点赞成功"
							})
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
	/* 电影详情 */
	.movie-details {
		display: flex;
		flex-direction: column;
		width: 90%;
		height: 100px;
		margin-left: 5%;
	}
/* 	.movie-details-img {
		flex: 1;
	} */
	.movie-details-img > img {
		/* width: 50%;
		height: 50%; */
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
		flex: 40%;
		height: 3em;
		text-indent: 2em;
		background-color: #e7e8e8;
		border-radius: 5px;
	}

	.comment-btn {
		flex: 20%;
	}

	.comment>button {
		border-radius: 5px;
	}
</style>
