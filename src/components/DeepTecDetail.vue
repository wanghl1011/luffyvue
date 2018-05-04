<template>
    <div style='margin-bottom: 20px'>
        <h1>文章详细({{currentArticleID}})：</h1>
        <div>
            <h3>文章名称：<strong>{{ArticleDetail.title}}</strong></h3>
        </div>
        <div>
                阅读：<span>{{ArticleDetail.view_num}}</span>&nbsp;&nbsp;
                评论：<span id='com'>{{ArticleDetail.comment_num}}</span>&nbsp;&nbsp;
                收藏：<span><span>{{ArticleDetail.collect_num}}</span></span>
        </div>
        <div>
          <h3>文章正文：</h3>
          <div style='width:50%' v-html='ArticleDetail.content'></div>
        </div>
        <div style='margin-top: 20px'>
            
            <div style='width:30%'>
              <div style='float: left;'>
                标签：
                <span style='color:#4a90e2' v-for='item in ArticleDetail.tags'>#{{item.name}}#</span>&nbsp;&nbsp;
              </div>
              <div style='float: right;'>
                <a style='text-decoration: none' @click='AgreeClick' role='button'>
                  点赞 |
                  <span id='agree_num'>{{ArticleDetail.agree_num}}</span>
                </a>&nbsp;&nbsp;&nbsp;
                <a style='text-decoration: none' @click='CollectClick' role='button'>收藏 |
                  <span id='collect_num'>{{ArticleDetail.collect_num}}</span>
                </a>
              </div>
            </div>

        </div>
        <div style='margin-top: 60px'>
          <h3>文章评论：</h3>
            
              <div id='article_comment'>
                <div v-if='ArticleDetail.comment'>
                  <div style='width:60%' class='well' v-for='item in ArticleDetail.comment'>
                    <div>
                      <span>{{item.name}}</span>
                      <span style='margin-left: 20px'>{{item.time}}</span>
                    </div>
                    <div>{{item.content}}</div>
                  </div>
                </div>
                <div v-else v-bind:class="{ hide: isHide }" class='no-comment'><h4>该文章暂无评论</h4></div>
              </div>
            
        </div>
        <div style='margin-top: 50px'>
              <h3>发表评论</h3>
              <div>
                <p>评论是：{{comment_content}}</p>
              </div>
              <div>
                <textarea id='input_comment' rows="10" cols="50" v-model='comment_content'></textarea>
              </div>
              <button @click='CommentClick' class='btn btn-primary'>发表评论</button>
              
        </div>
        
    </div>
                <!-- <tr role='button' v-for="item in courseDetail.recommend" @click="changeCourse(item.id)" > -->
</template>

<script>
    import $ from 'jquery'
    export default {
        name: 'article_detail',
        data() {
            return {
                currentArticleID: this.$route.params.aid,
                ArticleDetail:{
                  // title:null,
                  // brief:null,
                  // content:null,
                  // view_num:null,
                  // comment_num:null,
                  // collect_num:null,
                  // agree_num:null,
                  // tags:null,
                },
                comment_content:'',
                isHide:false
            }
        },
        mounted(){
            this.initArticleDetail()
        },
        methods:{
          initArticleDetail(){
            let that = this
            let url = this.$store.state.apiList.article + this.currentArticleID + "/"
            this.$axios.request({
              url: url,
              method:'GET',
              params:{
                token: this.$store.state.token
              }
            }).then(function (response) {
              console.log(response.data)
              if (response.data.code === 3000){
                    that.ArticleDetail = response.data.JsonData
                  }else {alert(response.data.msg)}
            })

          },
          AgreeClick(){
              let that = this
              let url = this.$store.state.apiList.AgreeArticle + this.currentArticleID + "/"
              this.$axios.request({
              url: url,
              method:'GET',
              params:{
                token: this.$store.state.token
              }
            }).then(function (response) {
              if (response.data.code===2100){
                // console.log(response.data)
                var old_agree_num = parseInt($("#agree_num").text()) + 1
                $("#agree_num").text(old_agree_num)
              
              }else {
                alert(response.data.msg)
              }
              
            })
          },
          CollectClick(){
              let that = this
              let url = this.$store.state.apiList.CollectArticle + this.currentArticleID + "/"
              this.$axios.request({
              url: url,
              method:'GET',
              params:{
                token: this.$store.state.token
              }
            }).then(function (response) {
              if (response.data.code===3100){
                var old_collect_num = parseInt($("#collect_num").text()) + 1
                $("#collect_num").text(old_collect_num)
              
              }else {
                alert(response.data.msg)
              }
              
            })
          },
          CommentClick(){
              let that = this
              let url = this.$store.state.apiList.CommentArticle + this.currentArticleID + "/"
              this.$axios.request({
              url: url,
              method:'post',
              params:{
                token: this.$store.state.token,
              },
              data:{
                content:this.comment_content
              }
            }).then(function (response) {
              if (response.data.code===4100){
                console.log(response.data)
                var tag = "<div style='width:60%' class='well'><div><span>"+response.data.username+"</span><span style='margin-left: 20px'>"+response.data.date+"</span></div><div>"+that.comment_content+"</div></div>"
                $("#article_comment").append(tag)

                var com = parseInt($("#com").text()) + 1
                $("#com").text(com)

                $("#input_comment").val("")
                $(".no-comment").remove()
                // that.isHide=true
              }else {
                alert(response.data.msg)
              }
              
            })
          }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li.course_li{
  border: 1 solid black
}
.hide{
  display: none;
}
</style>
