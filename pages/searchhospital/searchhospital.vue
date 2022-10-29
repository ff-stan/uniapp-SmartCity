<template>
	<view>
		<text></text>
	</view>
</template>

<script>
	import * as http from "../../utils/request.js"
	export default {
		data() {
			return {
				hospitalTitle:"",
				hospital:[],
				getImg: http.getImg
			}
		},
		onLoad(option) {
			// 接收传参
			this.hospitalTitle = option.hospitalTitle
		},
		created(){
			const that = this
			// 根据标题获取到对应的列表
			http.http({
				url: "/prod-api/youth_inn/NHospitalN/list",
				data: {
					hospitalName: this.hospitalTitle,
					
				}
			}).then((res) => {
				that.hospital = res.data.rows;
				console.log(that.hospital);
			}).catch((res)=>{
				console.log(res);
			})
		},
		methods: {
			
		}
	}
</script>

<style>
</style>