<template>
    <div>
        <!-- <h1>课程详细({{currentCourseID}})：</h1> -->
        <div style='text-align: center;'>
            <h2>{{courseDetail.name}}</h2>
            
        </div>
        <div class='container'>
          <h2>推荐课程：</h2>
          <table class='table table-border'>
            <thead>
              <tr>
                <td>课程ID</td>
                <td>课程名称</td>
              </tr>
            </thead>
            <tbody>
              <tr role='button' v-for="item in courseDetail.recommend" @click="changeCourse(item.id)" >
                <td>{{item.id}}</td>
                <td>{{item.name}}</td>
              </tr>
            </tbody>
          </table>
        </div>


        <div style='margin-top: 30px;text-align: center;'>
          <div @click='ChangeTab("gs")' v-bind:class="{click_tab:istab}" role='button' class='tab1'>课程概述</div>
          <div @click='ChangeTab("zj")' role='button' class='tab'>课程章节</div>
          <div @click='ChangeTab("pj")' role='button' class='tab'>用户评价</div>
          <div @click='ChangeTab("wt")' role='button' class='tab'>常见问题</div>
        </div>


        <div class='container' style='margin-top: 40px' v-show='tabs.gs'>
          <h2 style='text-align: center;'>课程概述</h2>
          <div class='col-md-8 col-md-offset-2' style='text-align: center;text-align: justify;'>
              <h4>{{courseDetail.brief}}</h4>
          </div>
          <div style='margin-top: 100px' class='col-md-12'>
            <!-- <h3>价格策略</h3> -->
            <div style='text-align: center;'>
              <div role='button' v-bind:class="{active:select_price_policy == index}" class='price' v-for='(item,index) in courseDetail.price' @click='ClickPricePolicy(index,item.id)'>
                <div style='margin-top: 27px;'>¥&nbsp;&nbsp;&nbsp;{{item.price}} </div>
                <div>有效期{{item.period}}</div>
              </div>
            </div>
          </div>
          <div class='col-md-12' style='margin-top: 60px;text-align: center'>
            <button @click='ShopClick' class='shopping btn btn-warning'>加入购物车</button>
          </div>
        </div>
        <div class='container' style='margin-top: 40px' v-show='tabs.pj'>
          <div >
            <div v-if='courseDetail.comment'>
              <div class='well' style='margin-bottom: 10px;width: 70%;' v-for='item in courseDetail.comment'>
                <div>{{item.name}}</div>
                <div>{{item.content}}</div>
              </div>
            </div>
            <div style='margin-bottom: 10px;text-align: center;' v-else>
              <div>
                <h3>暂无用户评价</h3>
              </div>
            </div>
          </div>
        </div>
        <div class='container' v-show='tabs.zj' style='margin-top: 40px;'>
          <div style='' v-for='item in courseDetail.zhangjie'>
              <div v-if='item.sections'>
                  <div>
                    <h3>{{item.chapter}}  {{item.title}}</h3>
                  </div>
                  <div style='margin-left: 20px' v-for='li in item.sections'>
                    <div style='text-align: left'>{{li.name}}</div>
                    <div style='text-align: right'>{{li.time}}</div>
                  </div>
              </div>
              <div style='text-align: center;' v-else>
                <div >
                    <h3>{{item.title}}</h3>
                </div>
              </div>
          </div>
        </div>
        
        <div class='container' style='margin-top: 40px' v-show='tabs.wt'>
          <div>
            <div style='width: 80%' class='well' v-for='(item,index) in courseDetail.questions'>
              <div>{{index+1}}   {{item.question}}</div>
              <div>{{item.answer}}</div>
            </div>
          </div>
        </div>
        
    </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.min.css'
    export default {
        name: 'course_detail',
        data() {
            return {
                currentCourseID: this.$route.params.id,
                courseDetail:{
                  id:null,
                  name:null,
                  // brief:null,
                  // recommend:null,
                  // comment:null,
                },
                tabs:{
                  gs:true,
                  zj:false,
                  pj:false,
                  wt:false
                },
                istab:false,
                select_price_policy:-1,
                price_policy_id:null
            }
        },
        mounted(){
            this.initCourseDetail()
        },
        methods:{
          initCourseDetail(){
            let that = this
            let url = this.$store.state.apiList.course + this.currentCourseID + "/"
            this.$axios.request({
              url: url,
              method:'GET',
              params:{
                token: this.$store.state.token
              }
            }).then(function (response) {
              console.log(response.data)
              if (response.data.code === 3000){
                  console.log(response.data.JsonData)
                    that.courseDetail = response.data.JsonData
                  }else if(response.data.code === 3001)
                    {alert(response.data.msg)}
            })

          },
          ShopClick(){
            let that = this
            let url = this.$store.state.apiList.AddShopCar + this.currentCourseID + "/"
            this.$axios.request({
              url: url,
              method:'post',
              params:{
                token: this.$store.state.token
              },
              data:{
                price_policy:this.price_policy_id,
                price_list:JSON.stringify(this.courseDetail.price),
                course_name:this.courseDetail.name
              },
              responseType: 'json'
            }).then(function (response) {
              if (response.data.code === 1100){
                  alert("购物车添加成功")
                  console.log(JSON.parse(response.data.JsonDate[that.$store.state.id]))
              }
              })
          },
          ClickPrice(index){
            
          },
          ClickPricePolicy(index,id){
            this.price_policy_id = id
            this.select_price_policy = index
            console.log(id)
            console.log(index)
            
          },
          ChangeTab(i){
            for (var item in this.tabs){
              if (item === i){
                this.tabs[i] = true
              }else {
                this.tabs[item] = false
              }
            }
          },
          changeCourse(courseId){
              //this.$router.push({name: 'course-detail', params: {id: courseId}})
              this.currentCourseID = courseId
              this.$router.push({path: "/course/detail/"+this.currentCourseID + "/"})
              this.initCourseDetail()
          }

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.click_tab{
  border-bottom: 2 solid #7ed321;
  color:white;
}
.tab,.tab1{
  display: inline-block;
  font-size: 20px;
/*  width: 20px;
  height:20px;*/
}
.tab{
  margin-left: 40px
}
.price{
  width: 220px;
  height: 112px;
  font-size: 20px;
  /*line-height: 80px;*/
  border:1px solid #979797;
  margin-left: 50px;
  text-align: center;
  display: inline-block;
}
.active{
  color:white;
  background-color: #7ed321;
  border:1px solid #7ed321;
}
button.shopping{
  width: 181px;
  height: 51px;
  font-size: 14px;
  border-radius: 82px;
  /*background: #f5a623;*/
  color:#fff;
  /*border:none;*/
}
/*.price_p{
  color:#333
}
.price_per{
  color:#9b9b9b;
}*/
</style>
