<template>
	<view class="content">
		<!-- 搜索框 -->
		<view class="search-top">
			<input type="text" confirm-type="search" v-model="search" placeholder="搜索">
			<icon type="search" @click="searchNews" class="search-icon"></icon>
		</view>
		<!-- 轮播图 -->
		<view class="swiper-view">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="800">
				<swiper-item v-for="item in swiperRows">
					<view class="swiper-item">
						<image mode="widthFix" :src="getImg(item.advImg)" @click="goTab"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 应用服务入口 -->
		<view class="items-box">
			<view class="item" v-for="item in items" @click="goActivity">
				<img :src="item.itemSrc"></image>
				<text>{{item.itemName}}</text>
			</view>
		</view>
		<!-- 热门主题 -->
		<h2 class="hot-topics-title">热门主题</h2>
		<view class="hot-topics">
			<view class="hot-topics-item">
				<view class="hot-topics-icon">

				</view>
				<text>冷酷白</text>
			</view>
			<view class="hot-topics-item">
				<view class="hot-topics-icon">

				</view>
				<text>炫彩黑</text>
			</view>
		</view>
		<!-- 新闻列表 -->
		<h2 class="new-list-title">新闻列表</h2>
		<view class="new-list">
			<!-- 遍历二维数组 -->
			<view v-for="item in newsList" class="new-view">
				<!-- 专题标题 -->
				<view class="new-title">
					{{item.name}}
				</view>
				<!-- 新闻列表 -->
				<view class="new-item" v-for="n in item">
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
		</view>
	</view>
</template>

<script>
	import * as http from "../../utils/request.js"
	export default {
		data() {
			return {
				search: "",
				swiperRows: [],
				items: [{
						itemName: "菜单管理",
						itemSrc: "./static/菜单管理.png"
					},
					{
						itemName: "操作日志",
						itemSrc: "./static/操作日志.png"
					},
					{
						itemName: "检验计划",
						itemSrc: "./static/检验计划.png"
					},
					{
						itemName: "检验任务",
						itemSrc: "./static/检验任务.png"
					},
					{
						itemName: "角色管理",
						itemSrc: "./static/角色管理.png"
					},
					{
						itemName: "配置管理",
						itemSrc: "./static/配置管理.png"
					},
					{
						itemName: "权限管理",
						itemSrc: "./static/权限管理.png"
					},
					{
						itemName: "用户管理",
						itemSrc: "./static/用户管理.png"
					},
					{
						itemName: "资源管理",
						itemSrc: "./static/资源管理.png"
					},
					{
						itemName: "组织管理",
						itemSrc: "./static/组织管理.png"
					}
				],
				news: [],
				newsList: [],
				getImg: http.getImg
			}
		},
		created() {
			// 获取轮播图数据
			const that = this
			http.http({
				url: "/prod-api/api/rotation/list?pageNum=1&pageSize=8&type=2",
			}).then(function(res) {
				that.swiperRows = res.data.rows
			})

			// 获取新闻类型
			http.http({
				url: "/prod-api/press/category/list"
			}).then(function(res) {
				that.news = res.data.data
				// 获取新闻列表
				that.news.forEach((x) => {
					http.http({
						url: "/prod-api/press/press/list",
						data: {
							type: x.id
						}
					}).then(function(res) {
						res.data.rows.name = x.name
						that.newsList.push(res.data.rows)
					})
				})
			})
		},
		methods: {
			// 搜索页
			searchNews: function() {
				console.log(this.search)
			},
			// 跳转轮播图页面
			goTab: function(e) {
				console.log(e)
			},
			// 跳转对应的服务页面
			goActivity: function(e) {
				console.log(e)
			},
		},
	}
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		/* background-color: #74b9ff; */
	}

	/* 搜索框 */
	.search-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 35px;
		margin: .5em 2em;
		padding: 0 .5em 0 2em;
		box-sizing: border-box;
		border-radius: 1em;
		background-color: #0984e3;
	}

	/* 轮播图 */
	.swiper {
		text-align: center;
	}

	.swiper-item>image {
		width: 100%;
	}

	/* 应用服务入口 */
	.items-box {
		display: flex;
		flex-wrap: wrap;
		align-content: space-between;
		width: 100%;
		height: 110px;
		padding: .5em 0;
		background-color: #6c5ce7;
	}

	.items-box>.item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 50px;
		flex: 20%;
		font-size: .7em;
	}

	.items-box>.item>img {
		flex: 1;
		width: 50%;
	}

	/* 热门主题 */
	.hot-topics-title {
		text-align: center;
	}

	.hot-topics {
		width: 80%;
		height: 100px;
		display: flex;
		justify-content: space-between;
		margin: 0 auto;
	}

	.hot-topics-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: center;
		width: 40%;
		text-align: center;
	}

	.hot-topics-icon {
		flex: 1;
		background-color: #6c5ce7;
		border-radius: 30px;
	}

	/* 新闻列表 */
	.new-list-title {
		text-align: center;
	}

	.new-view {
		width: 95%;
		margin: 1em auto 0 auto;
	}

	.new-title {
		font-size: 1.3em;
		text-align: center;
	}

	.new-item {
		display: flex;
		justify-content: space-between;
		margin-top: 1em;
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
