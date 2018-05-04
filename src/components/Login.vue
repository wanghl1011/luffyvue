<template>
  <div>
    <div>

      <input type="text" v-model="username" placeholder="请输入用户名">
      <input type="text" v-model="password" placeholder="请输入密码">
      <input type="button" @click="doLogin" value="登录">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      doLogin() {

        var that = this

        this.$axios.request({
          url:this.$store.state.apiList.auth,
          method: 'POST',
          data: {
            username: this.username,
            password: this.password
          },
          responseType: 'json'
        }).then(function (response) {
          console.log(response.data)
          console.log(typeof(response.data.code))
          if (response.data.code === 1000){
            console.log("ok")
            that.$store.commit("saveToken",response.data)
          }else if(response.data.code !== 1000)
            {alert(response.data.msg)}
            
          
          
        }).catch(function (response) {})
          }
            },

      }
    
  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
