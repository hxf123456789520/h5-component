let dataTools = {
    year(dataValue){
        return dataValue.getFullYear();
    },
    month(dataValue){
        return dataValue.getMonth()+1;
    },
    day(dataValue){
        return dataValue.getDate();
    },
    hour(dataValue){
        return dataValue.getHours();
    },
    minute(dataValue){
        return dataValue.getMinutes();
    },
    getDate(dataValue){
        return this.year(dataValue)+"年"+this.month(dataValue)+"月"+this.day(dataValue)+"日";
    },
    getTime(dataValue){
        //取小时与分钟
        if(this.minute(dataValue)===0){
            return this.hour(dataValue)+":0"+this.minute(dataValue);
        }else{
            return this.hour(dataValue)+":"+this.minute(dataValue);
        }
        
    },
    calcTime(DateTime,type){
        //过滤分钟，单位【00，15，30，45】
        let currentDate = new Date(DateTime);
        let minutes = currentDate.getMinutes(),
            hours = currentDate.getHours();
            if(0 < minutes&& minutes <=15){
              currentDate.setMinutes(15);
            }else if(15 < minutes&& minutes <=30){
              currentDate.setMinutes(30);
            }else if(30 < minutes&& minutes <=45){
              currentDate.setMinutes(45);
            }else if(45 < minutes&& minutes <=60){
              currentDate.setMinutes(0);
              currentDate = this.addOneHour(currentDate);
            }
            if(type==='end'){
                //结束时间推后一小时
                currentDate = this.addOneHour(currentDate);
            }
            return currentDate;
    },
    addOneHour(time){
        //增加1小时
        let addTime = time.getTime()+60*60*1000;
        return new Date(addTime);
    }
}
export default dataTools