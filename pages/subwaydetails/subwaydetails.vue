<template>
	<!-- 目前先依据地铁主页面给到的id值找到对应的地铁行动数据 后续等看一下原型图怎么做的 再做细节样式 -->
	<view>
		{{route.name}}
		{{route.first}} -- {{route.end}}
		{{route.startTime}} -- {{route.endTime}}
		站点数:{{route.stationsNumber}}
		总路程:{{route.km}}km
		<view class="" v-for="station in route.metroStepList">
			{{station.name}}
		</view>
		车辆运行站:{{route.runStationsName}}
		剩余时间:{{route.remainingTime}}分钟
	</view>
</template>

<script>
	export default {
		data() {
			return {
				route: []
			}
		},
		onShow() {
			const that = this
			uni.request({
				url: 'http://124.93.196.45:10001/prod-api/api/metro/line/' + getApp().globalData.nowSubwayRoute,
				success(res) {
					that.route = res.data.data
					console.log(res.data.data)
					uni.setNavigationBarTitle({
						title: res.data.data.name
					})
				}
			})
		},
		onLoad(option) {

		},
		methods: {

		}
	}
</script>

<style>

</style>
