<template>
	<view>
<!-- 		<camera v-if='!pic' :style="{height: 400 + 'px',width: 400 + 'px'}"></camera> -->
	<my-camera @choose='chooseinfo'  v-if='!pic'></my-camera>
	<view :style="{width: '100%',height: heightsys + 'px'}" class="content" v-else>
		<image :style="{width: '100%',height: heightsys + 'px'}" :src="imag" mode=""></image>
		<button type="primary" @click="reset">重新选择</button>
		<view class="info">
			<view class="left">
				<text>年龄：{{msg.age}}</text>
				<text>颜值：{{msg.beauty + '分'}}</text>
				<text>眼镜：{{map.glasses[msg.glasses.type] || msg.glasses.type}}</text>
				<text>脸型：{{map.face_shape[msg.face_shape.type] ||msg.face_shape.type}}</text>
			</view>
			<view class="right">
				<text>性别：{{map.gender[msg.gender.type]}}</text>
				<text>表情：{{map.expression[msg.expression.type] || msg.expression.type}}</text>
				<text>情绪：{{map.emotion[msg.emotion.type] || msg.emotion.type}}</text>
				<text>人脸信度：{{msg.face_probability *100 +'%'}}</text>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import { mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				position: 'back',
				msg: {},
				map: {
					gender: {
						male: '男',
						female: '女'
					},
					expression: {
						none: '无表情',
						smile: '微笑',

					},
					glasses: {
						none: '无眼镜',
						normal: '戴眼镜'
					},
					emotion: {
						neutral: '无情绪',
						surprise: '惊喜的',
						grimace: '做鬼脸',
						sad: '悲伤的',
						disgust: '反感的'
					},
					face_shape: {
						triangle: '倒三角脸',
						heart: '心型脸',
						oval: '鹅蛋脸',
						round: '大圆脸',
						square: '方脸'
					}

				}
			}
		},
		computed: {
			...mapState('m_home',['token','pic','imag','heightsys'])
		},
		methods: {
			...mapMutations('m_home',['clearsrc','updatapic','takePhoto']),
			getFaceinfo() {
				uni.request({
					method: 'POST',
					header: {
						"Content-Type": "application/json"
					},
					url: `https://aip.baidubce.com/rest/2.0/face/v3/detect?access_token=${this.token}`,
					data: {
						image: this.pic,
						image_type: 'BASE64',
						face_field: 'age,expression,face_shape,gender,glasses,landmark,landmark150,quality,eye_status,emotion,face_type,mask,spoofing,beauty',

					},
					success: ({
						data: res
					}) => {
						if (res.error_msg !== "SUCCESS") {
							uni.showModal({
								title: '提示',
								content: '未检测到人脸'
							})
							return this.clearsrc()
						}
						this.msg = res.result.face_list[0]
					}
				})

			},
			reset() {
				this.clearsrc()
			},
			chooseinfo () {
				const that =this
			uni.chooseImage({
					count: 1,
					sizeType: ['original'],
					sourceType: ['album'],
					success: (res) => {
						this.updatapic(res.tempFilePaths[0])
						this.getFaceinfo()
						
					}
				})
			},
		},
		watch: {
			pic (newName) {
				if (newName === '') return
				this.getFaceinfo()
			}
		}
	}
</script>

<style scoped>
	.info {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -80%);
		background-color: rgba(255, 255, 255, 0.7);
		display: flex;
		width: 300px;
		height: 200px;
		justify-content: space-around;
	}

	.left,
	.right {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	button {
		position: fixed;
		bottom: 50px;
		width: 100%;
		display: flex;
		justify-content: space-around;
	}
</style>
