<template>
	<view class="content" v-if="guideShow">
		<!-- 引导轮播图 -->
		<swiper :indicator-dots="true" :duration="1000" class="swiper" :style="{height:swiperheight}">
			<swiper-item v-for="x in 4">
				<view class="swiper-item" :style="{height:swiperheight}">{{x}}</view>
			</swiper-item>
			<!-- 最后一个引导页 -->
			<swiper-item>
				<view class="swiper-item last" :style="{height:swiperheight}">
					<!-- 模态框 -->
					<view class="model" v-show="modelShow">
						<view class="model-content">
							<label for="url">服务器地址</label>
							<input type="text" id="url" v-model="url">
							<label for="port">服务器端口</label>
							<input type="text" id="port" v-model="port">
							<button @click="subNet">修改网络接口</button>
						</view>
					</view>
					<view class="bottom-btn">
						<button @click="goIndex">开始使用</button>
						<button @click="changeNet">网络设置</button>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				guideShow: true,
				swiperheight: 0,
				modelShow: false,
				url: "http://124.93.196.45",
				port: "10001"
			}
		},
		created() {
			// 用缓存判断是否是第一次打开
			if(uni.getStorageSync("guideShow")){ 
				this.guideShow = false
				uni.switchTab({
					url: "../index/index"
				})
			}else{
				uni.setStorageSync("guideShow","true")
			}
			const that = this
			// 获取到屏幕的高度 动态赋值给swiper组件
			uni.getSystemInfo({
				success(res) {
					that.swiperheight = res.windowHeight + 'px'
				}
			})
			// 先初始化一下默认地址 防止后续没修改导致其他位置使用不了
			uni.setStorageSync("BASE_URL",this.url + ":" + this.port)
		},
		methods: {
			// 跳转到主页
			goIndex() {
				uni.switchTab({
					url:"../index/index"
				})
			},
			// 显示模态框
			changeNet() {
				this.modelShow = true
			},
			// 同步修改缓存中的BASE_URL
			subNet() {
				this.modelShow = false
				if(this.url != "" && this.port != ""){
					uni.setStorageSync("BASE_URL",this.url + ":" + this.port)
					uni.showToast({
						icon:'success',
						title:"修改成功!"
					})
				}else{
					uni.showToast({
						icon:'error',
						title:"修改失败!"
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
	.swiper-item {
		background-color: azure;
	}
	
	/* 最后一个引导页 */
	.last > .bottom-btn{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
	.last {
		position: relative;
	}
	.last > .bottom-btn > button{
		background-color: #bdc3c7;
	}
	.last > .bottom-btn > button * + *{
		margin-left: .5em;
	}
	/* 模态框 */
	.model {
		z-index: 999;
		position: absolute;
		width: 60%;
		height: 50%;
		left: 20%;
		top: 23%;
		background-color: #95a5a6;
	}
	.model-content{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}
	.model-content > * + *{
		margin-top: .5em;
	} 
	.model-content > input{
		height: 3em;
		padding-left: 2em;
		border-radius: 10px;
		background-color: #e7e8e8;
	}
</style>
