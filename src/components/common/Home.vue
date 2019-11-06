<template>
    <div class="wrapper">
        <v-head @changeCollapse="changeCollapse" :collapses="collapse"></v-head>
        <v-sidebar @changeCollapse="changeCollapse" :collapses="collapse"></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>
        <div class="bg" v-show="collapse"></div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import bus from './bus';
    export default {
        data(){
            return {
                tagsList: [],
                collapse: false
            }
        },
        components:{
            vHead, vSidebar
        },
        created(){
            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                let arr = [];
                for(let i = 0, len = msg.length; i < len; i ++){
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            })
            
        },
        mounted(){
            this.addEvent();
            this.preventMove();
        },
        methods:{
            addEvent(){
                let _this = this;
                document.querySelector('.bg').addEventListener('click',function(e){
                    if(e.target.className=='bg'){
                        _this.collapse = false;
                    }
                   
                });
            },
            changeCollapse(val){
                this.collapse = val;
            },
            preventMove(){
                document.addEventListener('touchmove',function(e){
                     e.preventDefault();
                });
            }
        }
    }
</script>
<style scope>
 @media only screen and (max-width:767px){
        .bg{
            background: rgba(0,0,0,0.5);
            position: fixed;
            left: 0;
            right:0;
            top:0;
            bottom:0;
            display: block;
            z-index: 2;
        }
        .content::-webkit-scrollbar{
            width:0;
            height:0;
        }
        .content{
            overflow-x:hidden;
            -webkit-overflow-scrolling:touch;
        }
    }
</style>

