<template>
	<view class="content">
		<!-- 搜索框 -->
		<view class="search-top">
			<input type="text" confirm-type="search" v-model="search" placeholder="搜索">
			<icon type="search" @click="searchService" class="search-icon"></icon>
		</view>
		<!-- 全部服务 -->
		<view class="service" v-for="(value, name) in items">
			<view class="service-title">{{name}}</view>
			<view class="service-items">
				<view class="service-item" v-for="item in value" @click="goActivity" :data-tab="item.link">
					<!-- 有一些图片路径是挂掉的 -->
					<img :src="getImg(item.imgUrl)" :alt="item.serviceDesc">
					<text>{{item.serviceName}}</text>
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
				items: {},
				getImg: http.getImg
			}
		},
		created() {
			const that = this
			uni.request({
				url: "http://124.93.196.45:10001/prod-api/api/service/list",
				success(res) {
					const old = {}
					res.data.rows.forEach((x) => {
						if (!Array.isArray(old[x.serviceType])) {
							old[x.serviceType] = []
						}
						old[x.serviceType].push(x)
					})
					that.items = old
				}
			})

		},
		methods: {
			// 搜索
			searchService: function() {
				console.log(this.search)
			},
			// 跳转到对应的服务页
			goActivity: function(e) {
				uni.navigateTo({
					url:"../" + e.target.dataset.tab
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

	/* 服务分类 */

	.service {
		display: flex;
		flex-direction: column;
	}

	.service-title {
		display: flex;
		width: 100%;
		height: 3em;
		box-sizing: border-box;
		line-height: 3em;
		padding-left: 1em;
		text-align: left;
		border-bottom: 1px solid #CCC;
	}

	.service-items {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		margin-top: 1em;
	}

	.service-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 20%;
	}

	.service-item>img {
		width: 50%;
		height: 50%;
		object-fit: contain;
	}

	.service-item>text {
		margin-top: .5em;
		font-size: .8em;
	}
</style>
