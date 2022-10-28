<template>
	<view class="content">
		<!-- 轮播图 -->
		<view class="swiper-view">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="800">
				<swiper-item v-for="item in swiperRows" :data-newsId="item.targetId" >
					<view class="swiper-item">
						<image mode="widthFix" :src="getImg(item.advImg)" @click="goDetail" :data-id="item.id"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 新闻列表 -->
		<view class="newsList">
			<scroll-view scroll-x="true" class="newsType">
				<view class="types">
					<view :class="{type : true, active : acitveType[x.id]}" v-for="x in newsType" @click="getNews"
						:data-id="x.id">
						<text>{{x.name}}</text>
					</view>
				</view>
			</scroll-view>
			<!-- 新闻列表 -->
			<view v-for="list in newsList" v-show="acitveType[list.id]" >
				<view class="new-item" v-for="n in list" @click="goDetail" :data-id="n.id">
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
				swiperRows: [],
				newsType: [],
				newsList: [],
				acitveType: [],
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
			}).then((res) => {
				that.newsType = res.data.data
				// 初始化新闻类型
				that.newsType.forEach((x, index) => {
					that.newsType[index] = {
						name: x.name,
						id: x.id,
						sort: x.sort
					}
				})
				// 获取对应类型的新闻内容
				let min, index = 0
				that.newsType.forEach((x, y) => {
					http.http({
						url: "/prod-api/press/press/list",
						data: {
							type: x.id
						}
					}).then(function(res) {
						// 添加类别判断id
						res.data.rows.id = x.id
						// 初始化判断
						that.$set(that.acitveType, x.id, false)
						if (index < 1) {
							min = x.id
							index++
						}
						// v-for循环会按照x.id顺序进行 可能后面的x.id会比之前的小 而被当成第一个触发函数
						// 所以这里做一下判断 在最后一次each循环的时候做修改 
						min > x.id ? min = x.id : ""
						y == that.newsType.length - 1 ? that.$set(that.acitveType, min, true) : ""
						// 初始化新闻列表
						that.newsList.push(res.data.rows)
					})
				})
			})

		},
		methods: {
			// 切换新闻类别
			getNews(e) {
				const num = String(e.mp.currentTarget.dataset.id)
				for (let x in this.acitveType) {
					if (x == num) {
						this.$set(this.acitveType, num, true)
					} else {
						this.$set(this.acitveType, x, false)
					}
				}
			},
			// 跳转到对应的新闻详情页
			goDetail(e){
				uni.navigateTo({
					url:"../newdetails/newdetails?newsId="+e.currentTarget.dataset.id
				})
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

	/* 轮播图 */
	.swiper {
		text-align: center;
	}

	.swiper-item>image {
		width: 100%;
	}

	/* 新闻列表 */
	.newsList {
		width: 100%;
		overflow: hidden;
		margin-top: .5em;
	}

	.types {
		display: flex;
		width: 800px;
		justify-content: space-between;
	}

	.types *+* {
		margin-left: .5em;
	}

	.type {
		flex: .8;
		background-color: cornsilk;
		text-align: center;
		border-radius: 10px;
	}

	/* 被选中的类型 */
	.active {
		background-color: coral;
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
