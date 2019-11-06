<template>
    <div class="sidebar" :class="collapses? 'showSideBar':'hideSideBar'">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="showMemu" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
        
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                showMemu:true,
                items: [
                    {
                        icon: 'el-icon-lx-home',
                        index: 'dashboard',
                        title: '系统首页'
                    },
                    {
                        icon: 'el-icon-lx-cascades',
                        index: 'table',
                        title: '基础表格'
                    },
                    {
                        icon: 'el-icon-lx-copy',
                        index: 'tabs',
                        title: 'tab选项卡'
                    },
                    {
                        icon: 'el-icon-lx-calendar',
                        index: '3',
                        title: '表单相关',
                        subs: [
                            {
                                index: 'form',
                                title: '基本表单'
                            },
                            {
                                index: '3-2',
                                title: '三级菜单',
                                subs: [
                                    {
                                        index: 'editor',
                                        title: '富文本编辑器'
                                    },
                                    {
                                        index: 'markdown',
                                        title: 'markdown编辑器'
                                    },
                                ]
                            },
                            {
                                index: 'upload',
                                title: '文件上传'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-emoji',
                        index: 'icon',
                        title: '自定义图标'
                    },
                    {
                        icon: 'el-icon-lx-emoji',
                        index: 'calendar',
                        title: '日历组件'
                    },
                    {
                        icon: 'el-icon-pie-chart',
                        index: 'charts',
                        title: 'schart图表'
                    },
                    {
                        icon: 'el-icon-rank',
                        index: '6',
                        title: '拖拽组件',
                        subs: [
                            {
                                index: 'drag',
                                title: '拖拽列表',
                            },
                            {
                                index: 'dialog',
                                title: '拖拽弹框',
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-warn',
                        index: '7',
                        title: '错误处理',
                        subs: [
                            {
                                index: 'permission',
                                title: '权限测试'
                            },
                            {
                                index: '404',
                                title: '404页面'
                            }
                        ]
                    }
                ]
            }
        },
        props:[
            'collapses'
        ],
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        watch:{
            collapses(newVal){
                 this.showCtrl(newVal);
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            this.collapse = this.collapses;
            
        },
        mounted(){
            this.showCtrl(this.collapses);
        },
        methods:{
            showCtrl(val){
                if(document.body.clientWidth < 767){
                    this.showMemu=false;
                }else{
                    this.showMemu=val;
                }
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
    @media only screen and (max-width:767px){
        .sidebar{
            top:0;
            position: fixed;
            z-index: 50;
            overflow-x: hidden;
            -webkit-overflow-scrolling:touch;
        }
        .showSideBar{
            transform: translateX(0%);
            animation: leftRmove 0.5s ;
            animation-fill-mode:forwards;
        }
        .hideSideBar{
            animation: rightRomove 0.5s;
            animation-fill-mode:forwards;
        }
        @keyframes leftRmove {
            0% {
                transform: translateX(-100%);
            }
            100% {
                transform: translateX(0%);
            }
        }
        @keyframes rightRomove {
            0% {
                transform: translateX(0%);
            }
            100% {
                transform: translateX(-100%);
            }
        }
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
        .el-menu{
            z-index: 50;
        }
    }
</style>
