<template>
	<view>
		<view v-if='!pic' class="context">
			<text>请选择两张证件照，建议选择 正脸 清晰 图像，要求被融合的人脸边缘需要与图片边缘保持一定距离，保证被融合的人脸的的核心区域完全在图片中</text>
		
		<view>
			<text>推荐示意图</text>
			<image src="https://ai.bdstatic.com/file/782D223A6C294881B23AD27D988BE7D0" mode="widthFix"></image>
			</view>
			<view>
			<text>不合格示意图</text>
			<image src="https://ai.bdstatic.com/file/625D4D6BC8F54FB8B26948FD23B7DFBA" mode="widthFix"></image>
		</view>
		<button type="primary" @click="ronghe">选择照片</button>
		</view>
		<view v-else>
				<image class="pic"  :src="pic" mode="widthFix"></image>	
				<button type="primary" @click="resetpic">重新选择照片</button>
		</view>


	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		computed: {
			...mapState('m_home',['token'])
		},
		data() {
			return {
				src: [],
				pic: ''
			}
		},
		methods: {
			ronghe () {
				uni.chooseImage({
					count: 2,
					sizeType: ['original'],
					sourceType: ['album'],
					success: (res) => {
						if (res.tempFilePaths.length !== 2) {
						uni.$showMessage('必须选择两张图片','none')	
						this.ronghe()
						return
						} 
						uni.$showMessage('选择照片成功')	
						for(var i =0; i<=1;i++){
							const fileManager = uni.getFileSystemManager()
							this.src[i] = fileManager.readFileSync(res.tempFilePaths[i], 'base64')
							}
							this.getFace()
						
					}
				})
			},
			getFace() {
				uni.request({
					method: 'POST',
					header: {
						"Content-Type": "application/json"
					},
					url: `https://aip.baidubce.com/rest/2.0/face/v1/merge?access_token=${this.token}`,
					data: {
					image_template: {
						image: this.src[0],
						image_type: 'BASE64',
						quality_control: "NONE"
					},
					image_target: {
						image: this.src[1],
						image_type: 'BASE64',
						quality_control: "NONE"
					}
					},
					success: ({
						data: res
					}) => {
					console.log(res)
					if (res.error_msg !== "SUCCESS"){
						uni.$showMessage('图片不符合要求，要求被融合的人脸边缘需要与图片边缘保持一定距离','none')
					}
					this.pic = res.result.merge_image
					this.pic = `data:image/jpg;base64,${this.pic}`
					}
				})
			
			},
			resetpic () {
this.pic = ''
			}
		},
		onLoad() {
		}
	}
</script>

<style lang="scss" scoped>
	.context{
		image{
			width: 150px;
		}
	}
	.pic{
		width: 100%;
	}
</style>
