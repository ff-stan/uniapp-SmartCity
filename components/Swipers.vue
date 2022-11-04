<template>
	<!-- 简单封装轮播图组件 用于复用 -->
	<view>
		<view class="swiper-view">
			<swiper class="swiper" :indicator-dots="true" :duration="1000">
				<swiper-item v-for="item in swiperRows">
					<view class="swiper-item">
						<image mode="widthFix" :src="getImg(item.advImg)" @click="goDetail" :data-id="item.id"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>

</template>

<script>
	import * as utils from "../utils/request.js"
	export default {
		name: "Swipers",
		props: ["swiperRows", "detail"],
		data() {
			return {
				getImg: utils.getImg
			}
		},
		methods: {
			//跳转轮播图页面 与 跳转到对应的新闻详情页
			goDetail(e) {
				uni.navigateTo({
					url: this.detail + e.currentTarget.dataset.id
				})
			}
		}
	}
</script>

<style scoped>
	/* 轮播图 */
	.swiper {
		text-align: center;
	}

	.swiper-item>image {
		width: 100%;
	}
</style>
