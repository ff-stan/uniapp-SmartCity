<template>
	<view class="content">
		<view class="search-top">
			<input type="text" confirm-type="search" v-model="search" placeholder="搜索">
			<icon type="search" @click="searchService" class="search-icon"></icon>
		</view>
	</view>
</template>

<script>
	import * as http from "../../utils/request.js"
	export default {
		data() {
			return {
				search: "",
			}
		},
		created() {
			
		},
		
		methods: {
			searchService:function(){
			
					uni.navigateTo({
						url: "../searchhospital/searchhospital?hospitalTitle=" + this.search
						,fail(e){
							console.log(e);
						}
					})
				
			}
		}
	}
</script>

<style>
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
</style>