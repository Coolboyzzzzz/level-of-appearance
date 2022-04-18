import Vue from "vue"
export default {
	namespaced: true,
	state: () => ({
		token: '23',
		heightsys: 0.9 * uni.getSystemInfoSync().windowHeight,
		pic: '',
		imag: ''
	}),
 	mutations: {
		async getToken (state) {
			const {data: res } = await uni.request({
				method:"POST",
				url:"https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=QTuZYO0Fp0dpQCg2xIXkx3gf&client_secret=vVaXW1sPIbnRFFjRxaxKQQF1GzD47yOc",
				success: ({data: res}) => {
					state.token = res.access_token
				}
			})
		},
		takePhoto(state) {
			const ctx = uni.createCameraContext()
			ctx.takePhoto({
				quality: 'high',
				success: (res) => {
this.commit('m_home/updatapic',res.tempImagePath)
	}
})
},
		clearsrc (state) {
			state.pic = ''
		},
		updatapic (state,e) {
			const fileManager = uni.getFileSystemManager()
			state.pic = fileManager.readFileSync(e, 'base64')
			state.imag = e
		}
}
}