<style lang="scss" scoped>
.time-control{
    width: 100%;
    height: 220px;
    padding:0 25px;
    background: #fff;
    position: relative;
    .table-date{
        width: 100%;
        font-size: 10px;
        overflow: hidden;
        overflow-x: scroll;
        .rowflex{
            display: -webkit-inline-box;
            flex-wrap: wrap;
            
            
            margin-right:8px;
            .time-title{
                min-width:30px;
                text-align: center;
                height: 25px;
                line-height: 25px;
                margin-right: 10px;
            }
        }
        .colflex{
            display: flex;
            flex-flow: column;
            flex-wrap: wrap;
            height: 180px;
        }
    }
    .left-icon,.right-icon{
        font-size: 20px;
        position: absolute;
        top:50%;
    }
    .left-icon{
        left:3px;
    }
    .right-icon{
        font-size: 20px;
        right:3px;
    }
    
}
.tips{
        width: 160px;
        position:absolute;
        background: #fff;
        box-shadow:0 2px 10px #c3c3c3;
        height: 140px;
        border-radius: 3px;
        .user{
            padding:8px 10px;
            text-align: center;
            font-size: 16px;
        }
        .reserveMsg{
            color: #666;
            padding:0 15px;
            line-height: 18px;
            word-break: break-all;
            font-size: 11px;
        }
    }
.item0,.item1,.item2,.item3{
    width: 30px;
    display: block;
    background: #c3c3c3;
    height: 40px;
    margin-bottom:3px;
    margin-right:10px;
}
.item0{
    background: url(../../../assets/img/timg.jpeg) repeat;
    background-size: 700%;
}
.item1{
    background: #dedede;
}
.item2{
    background: #faa719;
}
.item3{
    background: #1989fa;
}
.closeTips{
    width:100%;
    height:40px;
    line-height: 40px;
    border-top:1px solid #dedede;
    text-align: center;
    font-size: 14px;
    color: #3392e8;
    margin-top:10px;
    .boxArror{
        width:0;
        height:0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 8px solid #fff;
        border-bottom: 8px solid #fff;
        display: block;
        transform:rotate(45deg) translate(-50%);
        position: absolute;
        bottom:-9px; 
        background: #fff;
    }
}
</style>
<template>
    <div>
        <div class="time-control">
            <van-icon name="arrow-left" class="left-icon" @click="goLeft"></van-icon>
            <van-icon name="arrow" class="right-icon" @click="goRight"></van-icon>
            <div class="table-date">
                <div  class="rowflex">
                    <p class="time-title" v-for="(item,index) in dateHead" :key="index">{{item}}</p>
                </div>
                <div  class="colflex">
                    <p v-for="(itemState,itemIndex) in dateBody" :key="'item'+itemIndex" :class="`item${itemState}`" @click="reserveFn($event,itemIndex,itemState)"></p>
                </div>
            </div>
            
        </div>
        <div class="tips" v-show="showTips" v-bind:style="{left:clientY+'px',top:clientX+'px'}">
                <div class="user">已被{{useUserMsg.name}}预订</div>
                <p class="reserveMsg">时间：{{useUserMsg.time}}</p>
                <p class="reserveMsg">用于：{{useUserMsg.content}}</p>
                <div class="closeTips" @click="hideTips">知道了
                    <div class="boxArror"></div>
                </div>
        </div>
    </div>
</template>
<script>
import dateTools from '../../../utils/dateTools'
/**
 *state状态
    0-过期
    1-可预定
    2-已占用
    3-选中
 *   */
export default {
    data() {
        return {
            startTime:"9",
            endTime:"22",
            dateHead:[],
            dateBody:[],
            selectStart:null,
            selectEnd:null,
            currentTime:this.selectTime,
            showTips:false,
            clientX:'',
            clientY:''
        }
    },
    created() {
        this.creatHead();
        this.initDate();
    },
    watch: {
        selectTime(newVal,oldVal){
            this.currentTime=newVal;
            this.selectStart=null;
            this.selectEnd=null;
            this.initDate();
        }
    },
    props:['selectTime','useUserMsg'],
    methods: {
        initDate(){
            this.creatBody();
            this.calcCurrentDay();
            this.timeChange();
        },
        calcCurrentDay(){
            //如果选择的是当天，则重新取当前时间
            let current = dateTools.getDate(new Date()),
                newSelectTime = dateTools.getDate(this.selectTime);
            if(current===newSelectTime){
                this.currentTime=new Date();
            }
        },
        goLeft(){
            let tableDate = document.querySelector('.table-date');
            tableDate.scrollLeft=0;
        },
        goRight(){
            let tableDate = document.querySelector('.table-date');
            tableDate.scrollLeft=tableDate.scrollWidth;
        },
        hideTips(){
            let tableDate = document.querySelector('.table-date')
            this.showTips = false;
            tableDate.style.overflowX="scroll";
        },
        tipsControl(e){
            //占用弹窗位置计算
            this.showTips=true;
            let tips = document.querySelector('.tips'),
                timeControl = document.querySelector('.time-control'),
                tableDate = document.querySelector('.table-date'),
                boxArror = document.querySelector('.boxArror'),
                width = document.body.clientWidth||document.documentElement.clientWidth,
                Top = e.target.offsetTop,
                Left = e.clientX;
                tableDate.style.overflowX="hidden";
                if(width/2 < Left){
                    this.clientY=Left-160/320*width+15/320*width;
                    boxArror.style.right='5px';
                    boxArror.style.left='auto';
                }else{
                    this.clientY=Left-15/320*width;
                    boxArror.style.right='auto';
                    boxArror.style.left='13px';
                }
            this.clientX=Top+timeControl.offsetTop-140/320*width;
        },
        reserveFn(e,row,state){
            this.calcCurrentDay();
            this.timeChange();
            //row:格子的下标，state:状态
            switch(state){
                case 0 :
                    return;
                    break;
                case 1 :
                    if(this.selectStart===null){
                        //第一次记录开始
                        this.selectStart=row;
                        this.$set(this.dateBody,row,3);
                    }else if(this.selectEnd===null&&this.selectStart > row){
                        //结束位置未选，但当前选中位置大于起始位，倒选，开始位变起始位
                        this.sortUp(row,this.selectStart,3);
                    }else if(this.selectStart > row&&this.selectEnd!==null){
                        //如果选择行大于开始位置,加选，当前选中位变起始位
                        this.sortUp(row,this.selectEnd,3);
                    }else{
                        //顺选
                        this.sortDown(this.selectStart,row,3);
                    }
                    break;
                case 2 :                 
                    this.tipsControl(e);
                    return;
                    break;
                case 3 :
                    if(this.selectStart!=null&&this.selectEnd!=null){
                        //排除不是第一次选中
                        console.log(this.selectEnd+"-"+this.selectStart);
                        
                        if(this.selectStart===this.selectEnd){
                            //如果开始位和结束是一位，清空处理
                            this.$set(this.dateBody,row,1);
                            this.selectStart=null;
                            this.selectEnd=null;
                        }else if(this.selectEnd >= row&&this.selectStart <= row){
                               //如果选中位置位于开始位置和结束位置
                                for(let i=this.selectEnd;i>=row;i--){
                                    if(this.dateBody[i]===2){
                                        return;
                                    }else{
                                        this.$set(this.dateBody,i,1);
                                    }
                                }
                                if(this.selectStart === row){
                                    this.selectStart=null;
                                    this.selectEnd=null;
                                }else{
                                    this.selectEnd=--row;
                                }
                                
                        }
                    }else{
                        //排除选中开始位置
                        this.$set(this.dateBody,row,1);
                        this.selectStart=null;
                    }
                    break;
            }
            this.calcTimeFragment();
        },
        calcTimeFragment(){
            //计算时间断
            let startHour = null,
                startMin = null,
                endHour = null,
                endMin = null;
            if(this.selectStart!==null&&this.selectEnd===null){
                startHour = parseInt(this.selectStart*15/60)+9,
                startMin = this.selectStart*15%60,
                endHour = startHour,
                endMin = startMin+15;
                let arr=[startHour,startMin,endHour,endMin];
                this.emitParent(arr);

            }else if(this.selectStart!==null&&this.selectEnd!==null){
                startHour = parseInt(this.selectStart*15/60)+9,
                startMin = this.selectStart*15%60,
                endHour = parseInt(this.selectEnd*15/60)+9,
                endMin = this.selectEnd*15%60+15;
                let arr=[startHour,startMin,endHour,endMin];
                this.emitParent(arr);
            }else{
                this.$emit('getSelectTime',[]);
            }
        },
        emitParent(arr){
            if(arr[3]===60) arr[2]++,arr[3]=0;
            arr=this.addZero(arr);
            this.$emit('getSelectTime',[arr[0]+":"+arr[1],arr[2]+":"+arr[3]]);
        },
        addZero(arr){
            for(let i=0;i<arr.length;i++){
                    if(arr[i] < 10){
                        arr[i]="0"+arr[i];
                    }else{
                        arr[i]==arr[i];
                    }
            }
            return arr;
        },
        timeChange(){
            //设置过期时间状态
            //只取0，15，30，45的分钟，不够取整
            let arr = dateTools.getTime(dateTools.calcTime(this.currentTime)).toString().split(':'),
                //当前时间到9点总分钟
                list = (arr[0]-Number(this.startTime))*60+Number(arr[1]),
                boxNub = Math.ceil(list/15);
                for(let i=0;i<boxNub;i++){
                    this.$set(this.dateBody,i,0);
                }
                this.$set(this.dateBody,34,2);
                this.$set(this.dateBody,40,2);
                this.$set(this.dateBody,48,2);
                this.$set(this.dateBody,24,2);
        },
        sortUp(start,end,type){
            //倒序
            this.selectEnd=end;
             
            for(let i=end;i>=start;i--){
                if(this.dateBody[i]===2){
                    this.selectStart=++i;
                    return;
                }else{
                    this.selectStart=i;
                    this.$set(this.dateBody,i,type);
                }
                
             }
             
        },
        sortDown(start,end,type){
            //顺序
             for(let i=start;i<=end;i++){
                if(this.dateBody[i]===2){
                    this.selectEnd=--i;
                    return;
                }else{
                    this.selectEnd=i;
                    this.$set(this.dateBody,i,type);
                }
            }
            
        },
        creatHead(){
            //创建时间头
            let allTime = Number(this.startTime);
            for(let i=allTime;i<=this.endTime;i++){
                if(i<10){
                    this.dateHead.push("0"+i+":00");
                }else{
                    this.dateHead.push(i+":00");
                }
            }
        },
        creatBody(){
            this.dateBody=[];
            let allTime = Number(this.startTime);
            for(let i=allTime;i<=this.endTime;i++){
                for(let m=0;m<4;m++){
                    this.dateBody.push(1);
                }
            }
            //console.log(this.dateBody);
        }
    },
}
</script>
