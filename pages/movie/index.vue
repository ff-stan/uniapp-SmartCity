<template>
	<view class="content">
		<!-- 搜索框 -->
		<view class="search-top">
			<input type="text" confirm-type="search" v-model="search" placeholder="搜索">
			<icon type="search" @click="searchMovie" class="search-icon"></icon>
		</view>
		<!-- 轮播图 -->
		<view class="swiper-view">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="800">
				<swiper-item v-for="item in swiperRows">
					<view class="swiper-item">
						<image mode="widthFix" :src="getImg(item.advImg)" @click="goDetail" :data-id="item.id"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 电影展示区列表 -->
		<view class="movie-items">
			<view class="movie-item" v-for="item in movieItems" @click="goDetail" :data-id="item.id">
				<img :src="getImg(item.cover)">
				<view class="item-text">
					<h3>{{item.name}}</h3>
					<text>语种:{{item.language}}</text>
					<text>上映日期:{{item.playDate}}</text>
					<text>时长:{{item.duration}}分钟</text>
					<text>评分:{{item.score}}分</text>
					<text>想看:{{item.likeNum}}</text>
					<text>看过:{{item.favoriteNum}}</text>
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
				movieItems: [],
				getImg: http.getImg
			}
		},
		created() {
			const that = this
			// 获取轮播图资源
			http.http({
				url: "/prod-api/api/movie/rotation/list"
			}).then((res) => {
				that.swiperRows = res.data.rows
			})
			// 获取电影列表
			http.http({
				url: "/prod-api/api/movie/film/list"
			}).then((res) => {
				that.movieItems = res.data.rows
			})
		},
		methods: {
			goDetail(e) {
				uni.navigateTo({
					url: '../moviedetails/moviedetails?id=' + e.currentTarget.dataset.id
				});
			},
			searchMovie() {
				console.log(this.search)
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
		background-color: #e7e8e8;
	}

	/* 轮播图 */
	.swiper {
		text-align: center;
	}

	.swiper-item>image {
		width: 100%;
	}
	/* 电影展示区列表 */
	.movie-items {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-top: .5em;
		width: 100%;
	}
	.movie-items > * + *{
		margin-top: .5em;
	}
	.movie-item {
		display: flex;
		justify-content: space-between;
	}
	.movie-item > img {
		width: 50%;
		height: 50%;
	}
	.movie-item > .item-text {
		flex: 1;
		display: flex;
		flex-direction: column;
		margin-left: .5em;
		text-align: left;
	}
</style>
