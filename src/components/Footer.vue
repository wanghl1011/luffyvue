<template>
    <div style='text-align: center;margin-top: 190px' class="pg-footer">
        <div class="foot-link">
            <router-link class="item" v-for="(item,key) in guid" :key="key" :to="{name:item.link}">{{item.text}}</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "footer",
        data: function () {
            return {
                guid: [
                    {text: '关于我们', link: 'about-us'},
                    {text: '联系我们', link: 'about-us'},
                    {text: '商务合作', link: 'about-us'},
                    {text: '意见反馈', link: 'feedback'},
                    {text: '新手指南', link: 'user-note'},
                ]
            }
        }
    }
</script>

<style scoped>
    .foot-link > .item {
        margin: 0 5px;
    }
</style>
