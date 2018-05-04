<template>
    <h2>购物车</h2>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.min.css'
    export default {
        name: 'shopcar',
        data() {
            return {
                
            }
        },
        mounted(){
            this
        },
        methods:{
          initCourse(){
                let that = this

                this.$axios.request({
                  url:this.$store.state.apiList.course,
                  method:'',
                  params: {
                    token:this.$store.state.token,
                  },
                  responseType: 'json'
                }).then(function (response) {
                   
                }).catch(function(response){
                  
                })
          }
        }
    }
</script>

</style>
