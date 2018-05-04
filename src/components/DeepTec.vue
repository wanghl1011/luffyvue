<template>
    <div>
        <h1>文章列表</h1>
        <div>
          <div v-for="item in ArticleList" style="margin-top: 20px;">
            <router-link style='text-decoration: none' :to="{path:'/news/detail/'+item.id }">
              <div><h3><strong style='color: #414a60'>{{item.title}}</strong></h3></div>
              <div style='color: #9b9b9b'>
                <span>阅读：{{item.view_num}}</span>
                <span style='margin-left: 10px'>评论：{{item.comment_num}}</span>
                <span style='margin-left: 10px'>收藏：{{item.collect_num}}</span>
              </div>
              <div style='color:#666'>
                {{item.brief}}
              </div>
            </router-link>
            <hr>
          </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DeepTchno',
        data() {
            return {
              ArticleList:[]
            }
        },
        mounted(){
            this.initArticle()
        },
        methods:{
            initArticle(){
                let that = this

                this.$axios.request({
                  url:this.$store.state.apiList.article,
                  method:'GET',
                  params: {
                    token:this.$store.state.token,
                  },
                  responseType: 'json'
                }).then(function (response) {
                  // var response = JSON.parse(response)
                  // console.log(response.data.JsonData)
                  console.log(response.data)
                  if (response.data.code === 2000) {
                    that.ArticleList = response.data.JsonData
                  }else {alert(response.data.msg)}
                   
                  
                  
                  
                }).catch(function(response){
                  console.log("faild")
                  console.log(response.status) 
                  console.log(response.headers)
                  console.log(response['Access-Control-Allow-Origin'])
                })

            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
