<!--
 * @Description:
 * @Version: 2.0
 * @Autor: linzhuming
 * @Date: 2020-03-22 00:14:20
 * @LastEditors: linzhuming
 * @LastEditTime: 2023-03-10 22:18:31
-->
<template>
	<div>
		<zoom-form>
			<zoom-form-item label="姓名">
				<zoom-input></zoom-input>
			</zoom-form-item>
			<zoom-form-item label="年龄">
				<zoom-input></zoom-input>
			</zoom-form-item>
			<zoom-form-item label="班级">
				<zoom-input></zoom-input>
			</zoom-form-item>
			<zoom-form-item label="电话">
				<zoom-input></zoom-input>
			</zoom-form-item>
			<zoom-form-item label="联系地址">
				<zoom-input></zoom-input>
			</zoom-form-item>
			<zoom-form-item label="爱好">
				<zoom-input></zoom-input>
			</zoom-form-item>
			<zoom-form-item label="验证码">
				<zoom-captcha :op="testOp"></zoom-captcha>
			</zoom-form-item>
		</zoom-form>
		<zoom-row>
			<zoom-button type="primary" shape="plain">普通按钮</zoom-button>
			<zoom-button type="success" shape="plain">成功按钮</zoom-button>
			<zoom-button type="warning" shape="plain">警告按钮</zoom-button>
			<zoom-button type="info" shape="plain">信息按钮</zoom-button>
			<zoom-button type="danger" shape="plain">错误按钮</zoom-button>
			<zoom-link :underline="false" type="primary">普通链接</zoom-link>
			<zoom-link :underline="false" type="success">成功链接</zoom-link>
			<zoom-link :underline="false" type="warning">警告链接</zoom-link>
			<zoom-link :underline="false" type="info">信息链接</zoom-link>
			<zoom-link :underline="false" type="danger">错误链接</zoom-link>
		</zoom-row>
		<!-- <zoom-gallery :op="galleryOp"></zoom-gallery> -->
	</div>
</template>
<script>
export default {
  data() {
    return {
			num: 0,
			testOp: {
				show: true,
				onSuccess: () => {
					console.log('验证成功父组件接收');
				},
				onFailed: () => {
					console.log('验证失败父组件接收');
				},
				// RandomSrc:() => {
				// 	// this.num += 1;
				// 	// let src = '';
				// 	// if (this.num % 2 === 0) {
				// 	// 	src = 'http://necaptcha.nosdn.127.net/1de51d7763b14843a4749c48aacb7d5e.jpg';
				// 	// } else if (this.num % 2 === 1) {
				// 	// 	src = 'http://necaptcha.nosdn.127.net/6a5267d603004f2ca5c7a88e8cbc4916.jpg';
				// 	// } else {
				// 	// 	src = 'http://necaptcha.nosdn.127.net/d790d311e38241f986f8779605962e9f.jpg';
				// 	// }
				// 	// return src;
				// 	return 'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture'
				// }
			},
			galleryOp: {
				showZoom: true,
				data: [
					// require('../assets/1.jpg'),
					// require('../assets/2.jpg'),
					// require('../assets/3.jpg'),
					// require('../assets/4.jpg'),
				]
			}
    }
  }
}
</script>
<style>
.zoom-row .zoom-btn {
	margin: 5px;
}
</style>