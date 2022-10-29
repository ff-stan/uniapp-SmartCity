export const isLogin = function () {
	if (uni.getStorageSync('token') == "") {
		return uni.showToast({
			icon: "error",
			title: "请先登录!",
			success() {
				uni.navigateTo({
					url: "../login/login"
				})
			}
		})
	} else {
		return true
	}
}