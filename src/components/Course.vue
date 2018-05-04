<template>
    <div>
        <h1>课程列表</h1>
        <div style="margin-bottom: 30px">
          <div v-for="item in courseList" style="margin-top: 20px;">
            <router-link style='text-decoration: none' :to="{path:'/course/detail/'+item.id }">
              <div><h3><strong style='color: #414a60'>{{item.name}}</strong></h3></div>
              <div style='width:30%;color:#666'>{{item.jieshao}}</div>
              <div style='color:#9b9b9b'>难度：{{item.level}}</div>
            </router-link>
            <hr>
          </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'course',
        data() {
            return {
              courseList:[]
            }
        },
        mounted(){
            this.initCourse()
        },
        methods:{
            initCourse(){
                let that = this

                this.$axios.request({
                  url:this.$store.state.apiList.course,
                  method:'GET',
                  params: {
                    token:this.$store.state.token,
                  },
                  responseType: 'json'
                }).then(function (response) {
                  console.log(response.data)
                  if (response.data.code === 2000) {
                    that.courseList = response.data.JsonData
                  }else if (response.data.code === 2001) 
                    {alert(response.data.msg)}  
                }).catch(function(response){
                  console.log("faild")
                })

            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
