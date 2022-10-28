<!-- 这个页面为什么也叫index? 那是因为该服务最开始请求返回的数据中指定了该路径为 /metro_query/index -->
<template>
	<view>
		<view class="line" v-for="item in lines">
			<view class="line-name" @click="getDetails" :data-routeId="item.lineId">
				{{item.lineName}}
			</view>
			<view class="line-item">
				<view class="line-item-route">
					<view>
						{{item.preStep.name}}
					</view>
					<view>
						{{item.currentName}}
					</view>
					<view>
						{{item.nextStep.name}}
					</view>
				</view>
				<view class="line-item-reachTime">
					{{getTime(item.reachTime)}}
				</view>
				<!-- 上下站可换乘的路线 -->
				<!-- <view class="" v-for="x in item.preStep.lines">
					{{x.lineName == item.lineName ? "" : `可换乘${x.lineName}`}}
				</view>
				<view class="" v-for="y in item.nextStep.lines">
					{{y.lineName == item.lineName ? "" : `可换乘${y.lineName}`}}
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import * as http from "../../utils/request.js"
	export default {
		data() {
			return {
				// 由于使用定位需要联网获取对应平台的mapkey 所以暂用默认定位替代
				thisway: "建国门",
				lines: []
			}
		},
		// 每一次打开页面 都用定位去请求一次数据
		onShow() {
			const that = this
			http.http({
				url: "/prod-api/api/metro/list",
				data: {
					currentName: this.thisway
				}
			}).then((res) => {
				that.lines = res.data.data
				// console.log(res.data)
			})
		},
		created() {

		},
		computed: {

		},
		methods: {
			// 简单判断时间
			getTime(time) {
				return time == 0 ? "列车即将进站" : `列车到站时间还有 ${time} 分钟`
			},
			// 跳转到对应地铁线路详细页
			getDetails(e) {
				getApp().globalData.nowSubwayRoute = e.target.dataset.routeId
				uni.navigateTo({
					url: "../subwaydetails/subwaydetails"
				})
			}
		}
	}
</script>

<style scoped>
	.line-name {
		width: 3em;
		margin: 0 auto;
		text-align: center;
		background-color: deepskyblue;
		border: 1px solid black;
		border-radius: 5px;
	}

	.line-item {
		display: flex;
		flex-direction: column;
		width: 90%;
		margin: 1em 5%;
		padding-bottom: 1em;
		text-align: center;
		border-bottom: 1px dashed black;
	}

	.line:last-child>.line-item {
		border-bottom: none;
	}

	.line-item-route {
		display: flex;
		justify-content: space-between;
	}

	.line-item-reachTime {
		font-size: .8em;
		color: #5500ff;
	}
</style>
