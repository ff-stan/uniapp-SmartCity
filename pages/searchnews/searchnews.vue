<template>
	<view class="newsList" v-if="news.length > 1">
		<!-- 新闻列表 -->
		<view class="new-item" v-for="n in news" @click="goDetail" :data-id="n.id">
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
	</view>
	<view class="" v-else>
		暂无相关新闻
	</view>
</template>

<script>
	import * as http from "../../utils/request.js"
	export default {
		data() {
			return {
				newsTitle: "",
				news: [],
				getImg: http.getImg
			}
		},
		onLoad(option) {
			this.newsTitle = option.newsTitle
		},
		created() {
			const that = this
			// 根据标题获取到对应的列表
			http.http({
				url: "/prod-api/press/press/list",
				data: {
					title: this.newsTitle
				}
			}).then((res) => {
				that.news = res.data.rows
			})
		},
		methods: {
			goDetail(e) {
				uni.navigateTo({
					url: "../newdetails/newdetails?newsId=" + e.currentTarget.dataset.id
				})
			}
		}
	}
</script>

<style scoped>
	.newsList {
		width: 100%;
		overflow: hidden;
		margin-top: .5em;
	}

	.new-item {
		display: flex;
		justify-content: space-between;
		margin-top: .5em;
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
</style>
