<template>
	<view>

		<camera :flash="flag" :device-position='position' :style="{width: '100%',height: heightsys + 'px'}" resolution='high'>	
		</camera>			
		<view class="bottom">
			<image mode="heightFix" class='pic' src="../../static/zhuanhuan.png" @click="positionTras"></image>
			<image mode='heightFix' class='pic' src="../../static/paizhao.png" @click="takePhoto1"></image>
			<image mode='heightFix' class='pic' src="../../static/wenjianjia.png"  @click="choose"></image>
		</view>
<view class="tip" @click="shanguangdeng">
	<view class="top">
		开/关
	</view>
	<view>
		闪关灯
	</view>
</view>
	</view>
</template>

<script>
	import { mapState,mapMutations } from 'vuex'
	export default {
		name:"my-camera",
		computed: {
			...mapState('m_home',['heightsys'])
		},
		data() {
			return {
				position: 'front',
				flag:'off'
			};
		},
		methods: {
			...mapMutations('m_home',['takePhoto']),
			positionTras() {
				this.position = this.position === 'back' ? 'front' : 'back'
			},
			 takePhoto1() {
	this.takePhoto()
			},
			choose() {
this.$emit('choose')
			},
			shanguangdeng(){
				this.flag = this.flag === 'on' ? 'off' : 'on'
			uni.$showMessage(this.flag === 'on' ? '打开闪光灯' : '关闭闪光灯')
			}
		}
	}
</script>

<style lang="scss">
.tip{
		position: fixed;
		top: 0px;
		left: 50%;
		transform: translate(-50%,0);
		
}
.top{
	text-align: center;
}
	.bottom {
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.image{
		background-color: #000;
	}

.pic {
		height: 40px;
	}
</style>
