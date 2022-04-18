<template>
	<view>
		<my-camera v-if='!pic'></my-camera>
		<view v-else >
			<view  class="container" >
			<view class="doudou" v-for="(item,i) in Skin.acnespotmole.acne_list" :style="{ top: item.top + 'px',left: item.left + 'px'}"></view>
			<image :src="imag" mode="heightFix" :style="{ height: heightsys + 'px'}"></image>	
			</view>
			<button type="primary" @click="reset">重新选择照片</button>
		</view>
	</view>
</template>

<script>
	import { mapState,mapMutations } from 'vuex'
	export default {
		computed: {
			...mapState('m_home',['pic','token','pic','imag','heightsys'])
		},
		data() {
			return {
				Skin: []
			};
		},
		methods: {
			...mapMutations('m_home',['clearsrc']),
			getSkin () {
				uni.request({
					method: 'POST',
					url: `https://aip.baidubce.com/rest/2.0/face/v1/skin_analyze?access_token=${this.token}`,
					header: {
						"Content-Type": "application/json"
					},
					data: {
						  "image": this.pic,                                //图片内容
						  "image_type": "BASE64",                                                        //图片类型
						  "face_field": "color,smooth,acnespotmole,wrinkle,eyesattr,blackheadpore,skinface,skinquality",    //请求字段
						  "max_face_num": 1
					},
					success: ({data: res}) => {
						if (res.error_msg !== 'SUCCESS') {
							this.clearsrc()
							return uni.$showMessage('提交失败')
						}
						this.Skin = res.result.face_list[0]
					}
				})
			},
			reset () {
				this.clearsrc()
			}
			},
		onLoad() {
			
		},
		watch: {
			pic (newval) {
				if (newval === '') return
				this.getSkin()
			}
		}
	}
</script>

<style lang="scss">
.doudou {
	width: 2px;
	height: 2px;
	border: 1px solid #c00000;
	border-radius: 1px;
	position: absolute;
}
</style>
