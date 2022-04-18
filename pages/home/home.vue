<template>
	<view>
		<view class="container">
			<view class="content">
<button class='text' @click="gotoceyan">AI测颜</button>
<button class='text' @click="ronghe">人脸融合</button>
<button class='text' @click="gotoskin_analyze">皮肤分析</button>
<button class='text'></button>
			</view>
		</view>

	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	export default {
		data() {
			return {
			height: 0 	
			}
		},
		methods: {
			...mapMutations('m_home',['getToken']),
			gotoceyan () {
				uni.navigateTo({
					url: '../index/index'
				})
			},
			ronghe () {
				uni.navigateTo({
					url: '../ronghe/ronghe'
				})
			},
			gotoskin_analyze () {
				uni.navigateTo({
					url: "../skin_analyze/skin_analyze"
				})
			}
		},
		onLoad () {
			this.height = uni.getSystemInfoSync()
			this.getToken()
			
        wx.clearStorage()
		}
	}
</script>

<style lang="scss" scoped>
.container{
	page{
		background-color: #f8f8f8;
	}
	.content{
		width: 300px;
		height: 200px;
		background-color: rgba(217, 217, 217, 0.7);
		position: absolute;
		top: 35%;
		left: 50%;
		transform: translate(-50%,-50%);
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		align-items: center;
		.text{
			background-color: #f8f8f8;
			width: 40%;
			height: 40%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
</style>
