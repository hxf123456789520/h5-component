<template>
<div  class="calendarSelect">
    <van-cell-group>
      <van-field
        v-model="title"
        required
        clearable
        label="主题"
        placeholder="请输入"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="title"
        required
        clearable
        label="参会人"
        placeholder="请选择"
      />
    </van-cell-group>
    <van-row class="calendar-wrap">
      <van-col span="24">
      <div class="selectTime" @click="showPopup">
        <label>时间:</label>
        <span>{{meetingDate | getDate}}</span>
        <span v-show="currentHourStart||currentHourEnd">{{currentHourStart}}~{{currentHourEnd}}</span>
      </div>
      </van-col>
      <van-col span="24">
        <TimeRange :selectTime=meetingDate :useUserMsg=useUserMsg @getSelectTime="getSelectTime"></TimeRange>
      </van-col>
    </van-row>
    <div class="fixed-wrap">
    <van-row class="fixed-btn">
      <van-col span="22" offset="1">
        <van-button type="primary" size="large" class="save-btn">保存</van-button>
      </van-col>
    </van-row>
    </div>
    <!--弹出层-->
    <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        @confirm="confirm"
        @change="change"
        @cancel="cancel"
        :filter="filter"
        :min-date="mixDate"

      />
    </van-popup>

    
    </div>
</template>

<script>
import { Toast,Button,Row,Col,Field,CellGroup,DatetimePicker,Popup,Icon} from 'vant'
import TimeRange from '../components/vue-timeRange-component/index'
import dateTools from '../../utils/dateTools'
  export default {
    data() {
      return {
        title:"",
        meetingDate:dateTools.calcTime(new Date(),'start'),
        mixDate:new Date(),//最小可选当天
        currentDate: new Date(),
        dialogVisible:this.formVisible,
        show: false,
        dateArg:null,
        currentHourStart:null,
        currentHourEnd:null,
        useUserMsg:{
              name:'韩夏',
              time:'12：30——13：30',
              content:'2019部门会议全年总结'
        },
      }
    },
    components:{
        Button,
        Row,
        Col,
        Field,
        Toast,
        CellGroup,
        DatetimePicker,
        Popup,
        Icon,
        TimeRange
    },
    props:["formVisible"],
    watch: {
      formVisible(){
        this.dialogVisible = this.formVisible;
      },
      dialogVisible(newText,oldText){
        this.$emit("clickForm",newText);
      }
    },
    filters:{
      getDate(value){
        return dateTools.getDate(value)
      },
      getTime(value){
        return dateTools.getTime(value)
      },
    },
    computed: {
    },
    created() {
    },
    methods: {
      submitForm(formName) {
      },
      resetForm(formName) {
      },
      
      addHour(value){
        let b=60;
        value.setMinutes(value.getMinutes() + b, value.getSeconds(), 0);
        return value;
      },
      showPopup() {
        this.show = true;
        this.currentDate=this.meetingDate;
        
      },
      confirm(){
          //日历隐藏
          this.show=false;
          this.meetingDate = this.currentDate;
          this.currentHourStart = '';
          this.currentHourEnd = '';
      },
      change(){
      },
      cancel(){
        this.show=false;
      },
      filter(type,options){
        if(type==='minute'){
          console.log();
          return options.filter((currentValue) => currentValue%15===0);
        }
        return options;
      },
      getSelectTime(val){
        if(val.length){
          this.currentHourStart = val[0];
          this.currentHourEnd = val[1];
        }else{
          this.currentHourStart=0;
          this.currentHourEnd=0;
        }
        
      }
    }
  }
</script>
<style lang="scss" scope>
  .calendarSelect{
    background: #f5f4f4;
    .van-cell-group{
      margin-bottom:10px;
    }
    .date-range{
      width:100%;
      display: flex;
      background:#fff;
      margin-bottom: 10px;
      height: 80px;
      padding:10px 0;
      position: relative;
      .icon-arrow{
        position: absolute;
        height: 10px;
        font-size: 40px;
        top:calc(50% - 15px);
        left:calc(50% - 35px);
        color: #efefef;
      }
      p{
        padding:5px 15px;
        line-height: 10px;
      }
      .date-wrap{
        width:50%;
        font-size:14px;
        .data-title{
          color:#666;
        }
        .date-year{
          color:#666;
          font-size: 12px;
        }
      }
    }
    .fixed-wrap{
      position:relative;
      height:90px;

      .fixed-btn{
        position: fixed;
        bottom: 0;
        width: 100%;
        height:65px;
        background: #fff;
        padding-top:5px;
        border-top:1px solid #dedede;
        .save-btn{
          background-color: #1989fa;
          height: 45px;
          line-height: 45px;
          border-radius: 5px;
          border: none;
        }
      }
    }
    .calendar-wrap{
      font-size: 14px;
      background: #fff;
      .selectTime{
        padding-left: 25px;
        width:100%;
        height: 50px;
        line-height: 50px;
        display: flex;
      }
    }
  }
</style>