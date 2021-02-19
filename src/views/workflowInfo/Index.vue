<template>
  <div>
    <div class="heights"></div>
    <EgressForm :isDisabled="true" :id="queryId"  v-if="type === 'egress'"/>
    <VehicleForm :isDisabled="true" :id="queryId" v-else-if="type === 'vehicle'"/>
    <LeaveForm :isDisabled="true" :id="queryId" v-else-if="type === 'leave'"/>
    <BusinessForm :isDisabled="true" :id="queryId" v-else />
    
    <div class="heights"></div>
    <WorkflowDetails :id="queryId"/>
    <div class="heights"></div>
  </div>
</template>

<script>
import EgressForm from '../egress/components/Form'
import LeaveForm from '../leave/components/Form'
import BusinessForm from '../business/components/Form'
import VehicleForm from '../vehicle/components/Form'
import WorkflowDetails from '../workflow/components/Details'
import { LOGIN, LOGIN_UC, PERSON_INFO } from '@/apis/base'
export default {
  components: {
    EgressForm,
    LeaveForm,
    BusinessForm,
    VehicleForm,
    WorkflowDetails
  },
  data () {
    return {
      form: {},
      queryId: this.$route.query.id,
      type: this.$route.query.type || 'egress'
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
    }
  },
  mounted () {
    let query = this.$route.query
    if (query.token) {
      sessionStorage.setItem('token', query.token)
      this.$store.commit('token', query.token)
      this.getUser()
    }
  }

}
</script>

<style lang="scss" scoped>
.heights {
  width: 100%;
  height: 10px;
  background:#f2f2f2;
}
</style>