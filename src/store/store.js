import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'vue-cookies'
import 'bootstrap/dist/css/bootstrap.min.css'
import $ from 'jquery'
Vue.use(Vuex);

export default new Vuex.Store({
  // 组件中通过 this.$store.state.username 调用
  state: {
    username: Cookie.get('username'),
    token: Cookie.get('token'),
    // token: 'gdyasdsadasdawwdawd',
    apiList: {
      auth: 'http://127.0.0.1:8000/api/v1/auth/',
      course: 'http://127.0.0.1:8000/api/v1/course/',
      article: 'http://127.0.0.1:8000/api/v1/article/',
      AgreeArticle:'http://127.0.0.1:8000/api/v1/article/agree/',
      CollectArticle:'http://127.0.0.1:8000/api/v1/article/collect/',
      CommentArticle:'http://127.0.0.1:8000/api/v1/article/comment/',
      AddShopCar:'http://127.0.0.1:8000/api/v1/order/addshopcar/',

    }
  },
  mutations: {
    // 组件中通过 this.$store.commit(参数)  调用
    saveToken: function (state, userToken) {
      // token，保存到cookie中。
      // 用户名，保存到cookie中。
      // &
      // 将“登录” 变成用户名
      // that.$store.state.username = that.username
      state.username = userToken.name
      state.token = userToken.token
      state.id = userToken.id

      shopcar_list = []

      Cookie.set("username", userToken.name, "60min")
      Cookie.set("token", userToken.token, "60min")
    },
    clearToken: function (state) {
      state.username = null
      state.token = null
      Cookie.remove('username')
      Cookie.remove('token')
    }
  },
})
