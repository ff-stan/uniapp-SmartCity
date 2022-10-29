<template>
	<view class="content">
		<!-- 轮播图 -->
		<view class="swiper-view">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="800">
				<swiper-item v-for="item in swiperRows" :data-newsId="item.targetId">
					<view class="swiper-item">
						<image mode="widthFix" :src="getImg(item.advImg)" @click="goDetail" :data-id="item.targetId">
						</image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="activity-list">
			<scroll-view scroll-x="true" class="activity-type">
				<view class="types">
					<view :class="{type : true, active : acitveType[x.id]}" v-for="x in activityType"
						@click="getActivity" :data-id="x.id">
						<text>{{x.name}}</text>
					</view>
				</view>
			</scroll-view>
			<!-- 活动列表 -->
			<view v-for="list in activityList" v-show="acitveType[list.id]">
				<view class="activity-item" v-for="n in list" @click="goDetail" :data-id="n.id">
					<view class="activity-item-img">
						<img :src="getImg(n.imgUrl)">
					</view>
					<view class="activity-item-text">
						<h5>{{n.name}}</h5>
						<p>点赞数:{{n.likeNum}}</p>
						<p>报名数:{{n.signupNum}}</p>
						<p>发布时间:{{n.publishTime}}</p>
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
				activityType: [],
				activityList: [],
				acitveType: [],
				getImg: http.getImg
			}
		},
		created() {
			const that = this
			// 获取轮播图数据
			http.http({
				url: "/prod-api/api/activity/rotation/list"
			}).then((res) => {
				that.swiperRows = res.data.rows
			})
			// 获取活动类型
			http.http({
				url: "/prod-api/api/activity/category/list"
			}).then((res) => {
				that.activityType = res.data.data
				// 初始化活动类型
				that.activityType.forEach((x, index) => {
					that.activityType[index] = {
						name: x.name,
						id: x.id,
						sort: x.sort
					}
				})
				// 获取对应类型的活动内容
				that.activityType.forEach((x, y) => {
					http.http({
						url: "/prod-api/api/activity/activity/list",
						data: {
							categoryId: x.id
						}
					}).then(function(res) {
						// 添加类别判断id
						res.data.rows.id = x.id
						// 初始化判断
						that.$set(that.acitveType, x.id, false)
						// 默认第一个触发
						that.$set(that.acitveType, 1, true)
						that.activityList.push(res.data.rows)
					})
				})
			})
		},
		methods: {
			goDetail(e) {
				uni.navigateTo({
					url: "../activitydetails/activitydetails?activityId=" + e.currentTarget.dataset.id
				})
			},
			getActivity(e) {
				const num = String(e.currentTarget.dataset.id)
				for (let x in this.acitveType) {
					if (x == num) {
						this.$set(this.acitveType, num, true)
					} else {
						this.$set(this.acitveType, x, false)
					}
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

	/* 轮播图 */
	.swiper {
		text-align: center;
	}

	.swiper-item>image {
		width: 100%;
	}

	/* 活动列表 */
	.activity-list {
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

	/* 活动列表 */
	.activity-item {
		display: flex;
		justify-content: space-between;
		margin-top: .5em;
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
</style>
