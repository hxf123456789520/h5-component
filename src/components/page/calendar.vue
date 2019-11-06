<template>
  <div class="content">
    <!-- agoDayHide='1517483961' -->
    <!-- futureDayHide="1526054400" -->
    <Calendar
      ref="Calendar"
      :markDateMore="arr"
      :markDate="arr2"
      v-on:isToday="clickToday"
      agoDayHide="1530115221"
      v-on:choseDay="clickDay"
      v-on:changeMonth="changeDate"
    ></Calendar>
    <br>
    <h5 @click="demo">markDateMore标记不同风格：：1号2号一种风格====13号另一种风格</h5>
    <br>
    <div class="div" @click="demo ">点击跳到2018-12-12</div>
  </div>
</template>

<script>
// import Calendar from '../vue-calendar-component/index';
import { Toast,Button,Row,Col,Field,CellGroup} from 'vant'
import Calendar from "../components/vue-calendar-component/index";
export default {
  data() {
    return {
      // arr2: ['2018/6/23'],
      arr2: [],
      formVisible:false,
      arr: [
        {
          date: "2019/8/1",
          className: "mark1"
        },
        {
          date: "2019/8/13",
          className: "mark2"
        }
      ]
    };
  },
  components: {
    Calendar,

  },
  methods: {
    clickDay(data) {
      console.log("选中了", data); //选中某天
      Toast("选中了" + data);
      this.formVisible=true;
    },
    clickToday(data) {
      console.log("跳到了本月今天", data); //跳到了本月
    },
    visibleForm(val){
      console.log(val);
      this.formVisible=val;
    },
    changeDate(data) {
      Toast("切换到的月份为" + data);
      console.log("左右点击切换月份", data); //左右点击切换月份
    },
    demo() {
      this.$refs.Calendar.ChoseMonth("2018-12-13"); //跳到12月12日选中12月12日
    }
  },
  created() {
    function format(date, index) {
      date = new Date(date);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${index}`;
    }
    setTimeout(() => {
      this.arr = [
        {
          date: format(new Date(), 3),
          className: "mark1"
        },
        {
          date: format(new Date(), 12),
          className: "mark2"
        }
      ];
      this.arr.push({
        date: format(new Date(), 15),
        className: "mark1"
      });
    }, 3000);
  }
};
</script>

<!-- Add "scoped " attribute to limit CSS to this component only -->
<style scoped>
.content{
  background:#f5f4f4;
}
h3 {
  text-align: center;
  width: 90%;
  margin: auto;
}
.div {
  margin: auto;
  width: 220px;
  height: 44px;
  line-height: 44px;
  background: #0fc37c;
  color: #fff;
  font-size: 17px;
  text-align: center;
  margin-top: 20px;
}
.wh_container >>> .mark1:before {
  background-color: orange;
}
.wh_container >>> .mark2 {
  background-color: blue;
}
.wh_content_item > .wh_isMark {
  background: orange;
}
.wh_container >>> .wh_content_all {
  background-color: #fff; 
}
</style>