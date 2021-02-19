<template>
	<div class="invite">
		<p class="invite-user">尊敬的建协云用户：</p>
		<p class="invite-txt">
				您的好友
				<span class="blue">{{ info.creatorName }}( {{ info.creatorLoginName }} )</span>
				邀请您加入
				<span class="blue">{{ info.unitName }}</span>
		</p>
		<div class="invite-btn">
			<van-button disabled type="primary" v-if="info.status == 1">已同意</van-button>
			<van-button disabled type="info" v-else-if="info.status == 2">已拒绝</van-button>
			<div v-else>
				<van-button type="info" @click="onSubmit(1)">同意</van-button>
				<van-button type="danger" @click="onSubmit(2)">拒绝</van-button>
			</div>
		</div>
    <sh-loading :loading="loading"></sh-loading>
	</div>
</template>

<script>
	import { LOGIN, LOGIN_UC, PERSON_INFO, PERSON_INVITE, PERSON_INVITE_ID } from '@/apis/base'
	export default {
		data() {
			return {
				queryId: '',
				loading: false,
				info: {
					creatorName: '',
					creatorLoginName: '',
					unitName: '',
					status: 0
				}
			}
		},
		methods: {
			getUser () {
			  this.$post(
			    PERSON_INFO,
			    '',
			    data => {
			      sessionStorage.setItem('user', JSON.stringify(data.data))
			      this.$store.commit('user', data.data)
			    }
			  )
			},
			loadInviteInfo () {
				this.$post(
					PERSON_INVITE_ID,
					{id: this.queryId},
					data => {
						this.info = data.data
					},
					error => {
						this.$toast.fail(error.msg)
					}
				)
			},
			onSubmit(type) {
				this.$dialog.confirm({
					title: '提示',
					message: `是否确认${type == 1 ? '同意': '拒绝'}加入企业？`,
				})
				.then(() => {
					this.loading = true
					this.$post(
						PERSON_INVITE,
						{
							inviteId: this.queryId,
							type: type
						},
						data => {
							this.$toast.success(data.msg)
							// 操作成功,延迟跳转
							setTimeout(() => {
								this.loading = false
								if (this.isAndroid()) { // 判断设备是安卓还是ios
									android.back()
								} else {
									webkit.messageHandlers.back.postMessage({})
								}
							},1000)
						},
						error => {
							this.$toast.fail(error.msg)
          		this.loading = false
						}
					)
				})
				.catch(() => {})
			},
			isAndroid() {
        // 判断设备为安卓
				var u = navigator.userAgent;
				if (u.indexOf("iPhone") > -1 || u.indexOf("iOS") > -1) {  //是否是ios
					return false;
				}
				return true;
			}
		},
		mounted() {
			let query = this.$route.query
			if (query.token) {
			  sessionStorage.setItem('token', query.token)
			  this.$store.commit('token', query.token)
			}
			if (query.userId) {
			  sessionStorage.setItem('token', {id: query.userId})
			  this.$store.commit('token', {id: query.userId})
			} 
			if (!query.token && !this.$store.state.token) {
			  this.$toast.fail('获取不到令牌!')
			} else if (!query.userId && !this.$store.state.user) {
			  this.getUser()
			}
			if (query.id) {
				this.queryId = query.id
				this.loadInviteInfo()
			} else {
				this.$toast.fail('获取不到id!')
			}
		}
	}
</script>

<style lang="scss" scoped>
.invite{
  padding-top: 42px;
	margin: 20px;
	&-txt{
		margin-top: 30px;
		line-height: 30px;
		text-indent: 32px;
	}
	&-btn{
		margin-top: 30px;
		::v-deep.van-button{
			width: 100%;
			margin-top: 10px;
		}
	}
}
.blue{
	color: #1989fa;
	margin: 0 5px;
}
</style>
