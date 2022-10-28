const BASE_URL = uni.getStorageSync("BASE_URL") || 'http://124.93.196.45:10001' //接口地址
export const http = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			header: {
				Authorization: uni.getStorageSync('token')
			},
			success: (res) => {
				if (res == "") {
					return uni.showToast({
						"icon": "loading",
						"title": "获取数据失败"
					})
				}
				resolve(res)
			},
			fail: (err) => {
				reject(err)
				return uni.showToast({
					icon: 'loading',
					title: "请求失败"
				})
			}
		})
	})
}
// 返回添加服务器地址前缀的图片地址字符串
export const getImg = (img) => "http://124.93.196.45:10001" + img
