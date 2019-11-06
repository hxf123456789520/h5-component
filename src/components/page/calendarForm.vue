<template>
<div  class="calendarForm">
    <van-cell-group>
      <van-field
        v-model="ruleForm.title"
        required
        clearable
        label="主题"
        placeholder="请输入"
      />
    </van-cell-group>
    <div class="date-range">
      <van-icon name="arrow" class="icon-arrow"/>
      <div class="date-wrap" @click="showPopup('start')">
        <p class="data-title">开始</p>
        <p class="date-year">{{ruleForm.startDate | getDate}}</p>
        <p class="data-time">{{ruleForm.startDate | getTime}}</p>
      </div>
      <div class="date-wrap" @click="showPopup('end')">
        <p class="data-title">结束</p>
        <p class="date-year">{{ruleForm.endDate  | getDate}}</p>
        <p class="data-time">{{ruleForm.endDate  | getTime}}</p>
      </div>
    </div>
    <van-cell-group>
      <van-field
          v-model="ruleForm.message"
          label="描述"
          type="textarea"
          placeholder="请输入"
          rows="2"
          autosize
        />
    </van-cell-group>
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
        type="datetime"
        @confirm="confirm"
        @change="change"
        @cancel="cancel"
        :filter="filter"
        :min-date="mixDate"
        :max-date="maxDate"

      />
    </van-popup>

    
    </div>
</template>

<script>
import { Toast,Button,Row,Col,Field,CellGroup,DatetimePicker,Popup,Icon} from 'vant'
import dateTools from '../../utils/dateTools'
  export default {
    data() {
      return {
        ruleForm: {
          title: '',
          message: '',
          startDate:dateTools.calcTime(new Date(),'start'),
          endDate:dateTools.calcTime(new Date(),'end')
        },
        mixDate:new Date(),//最小可选当天
        maxDate: new Date(dateTools.calcTime(new Date(),'start').getTime()+60*24*60*60*1000),//最大可选60天
        currentDate: new Date(),
        dialogVisible:this.formVisible,
        show: false,
        dateArg:null
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
      // startDate(){
      //   return dateTools.getDate(this.ruleForm.startTime.year);
      // },
      // endDate(){
      //   return dateTools.getDate(this.ruleForm.endTime.year);
      // }
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
      showPopup(type) {
        this.show = true;
        this.dateArg = type;
        if(type==='start'){
          this.currentDate=this.ruleForm.startDate;
        }else{
          this.currentDate=this.ruleForm.endDate;
        }
        
      },
      confirm(){
          //日历隐藏
          this.show=false;
          let result = this.currentDate.getTime()-this.ruleForm.startDate.getTime();
          if(result>0){
            //如果是开始时间，每选择一次，结束时间都重新生成
            if(this.dateArg==='start'){
                this.ruleForm.startDate = this.currentDate;
                this.ruleForm.endDate = dateTools.calcTime(this.currentDate,'end');
            }else if(this.dateArg==='end'){
                this.ruleForm.endDate = this.currentDate;
            }
          }else{
            Toast("结束时间不能小于开始时间");
          }
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
      }
    }
  }
</script>
<style lang="scss" scope>
  .calendarForm{
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
    
  }
</style>