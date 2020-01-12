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
		<!-- <zoom-gallery :op="galleryOp"></zoom-gallery> -->
	</div>
</template>
<script>
export default {
  data() {
    return {
			num: 0,
			testOp: {
				onSuccess: () => {
					console.log('验证成功父组件接收');
				},
				onFailed: () => {
					console.log('验证失败父组件接收');
				},
				RandomSrc:() => {
					// this.num += 1;
					// let src = '';
					// if (this.num % 2 === 0) {
					// 	src = 'http://necaptcha.nosdn.127.net/1de51d7763b14843a4749c48aacb7d5e.jpg';
					// } else if (this.num % 2 === 1) {
					// 	src = 'http://necaptcha.nosdn.127.net/6a5267d603004f2ca5c7a88e8cbc4916.jpg';
					// } else {
					// 	src = 'http://necaptcha.nosdn.127.net/d790d311e38241f986f8779605962e9f.jpg';
					// }
					// return src;
					return 'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture'
				}
			},
			galleryOp: {
				showZoom: true,
				data: [
					require('../assets/img/lordea-home-01-min.jpg'),
					require('../assets/img/lordea-home-02-min.jpg'),
					require('../assets/img/lordea-home-03-min.jpg'),
					require('../assets/img/lordea-home-04-min.jpg'),
					require('../assets/img/lordea-home-05-min.jpg'),
					require('../assets/img/lordea-home-06-min.jpg'),
					require('../assets/img/lordea-home-07-min.jpg'),
					require('../assets/img/lordea-home-08-min.jpg'),
				]
			}
    }
  }
}
</script>
<style>

</style>