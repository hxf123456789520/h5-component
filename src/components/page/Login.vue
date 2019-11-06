<template>
    <div class="login">
        <van-row>
        <van-col span="24">
            <div class="login-wrap"><img src="../../assets/img/logo.png"/></div>
        </van-col>
        </van-row>
        <van-row class="wrap-pd">
        <van-cell-group>
            <van-field v-model="ruleForm.username"   @blur="blurname"  @focus="focusname" class="input-control" />
            <van-field v-if="isshowPassWord"  v-model="ruleForm.password" class="input-control" type="password" @blur="blurInput" />
            <van-field v-if="!isshowPassWord" v-model="passwordtext" @focus="focusInput"   class="input-control" />
            <van-button size="large"  round type="danger" class="btn-login" @click="submitLogin()">登录</van-button>
        </van-cell-group>
        </van-row>
    </div>
</template>

<script>
import { Toast,Button,Row,Col,Field,CellGroup} from 'vant'
export default {
        data: function(){
            return {
                passwordtext:'密码',
                isshowPassWord:false,
                ispopup:false,
                popupText:'',
                errUsername:'',
                ruleForm: {
                    username: '账号',
                    password: ''
                },
            }
        },
        comments:{
            [Button.name]:Button,
            [Row.name]:Row,
            [Col.name]:Col,
            [Field.name]:Field,
            [Toast.name]:Toast,
            [CellGroup.name]:CellGroup
        },
        methods: {
            postData(preUrl,devUrl,thisData,parameter) {
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                if (process.env.NODE_ENV === 'development') {
                    preUrl = devUrl
                    }
                    this.$axios.post(preUrl, parameter).then(res => {
                        if(res.data.code==200){
                                Toast("登录成功");
                                cookieFn.setCookie('username',this.ruleForm.username);
                                cookieFn.setCookie('password',this.ruleForm.password);
                                cookieFn.setCookie('token',"Venus "+res.data.data.token,'none');
                                this.$router.push("/userCenter/list");
                        }else{
                                Toast(res.data.message);
                        }
                    });
                    
            },
            focusInput(){
            this.isshowPassWord=true;
            },
            blurInput(){
            if(this.ruleForm.password==''){
                this.isshowPassWord=false;
            }
            },
            focusname(){
            if(this.ruleForm.username=='账号'){
                this.ruleForm.username='';
            }
            },blurname(){
            if(this.ruleForm.username==''){
                this.ruleForm.username='账号';
            }
            },submitLogin(){
            let Isrequired =true; 
            for(var key in this.ruleForm){
                if(this.ruleForm[key]==''||this.ruleForm[key]=="账号"){
                    Toast("用户名和密码不能为空")
                    Isrequired=false
                    return ;
                }
            }
            }
    }
}
</script>
<style scoped lang="scss">
.login-wrap{
  width:115px;
  height:115px;
  margin:0 auto;
  margin-top:85px;
  background:#fff;
  border-radius:50%;
}
.login-wrap img{
  width:100%;
}
.input-control{
  height:60px;
  line-height:60px;
  font-size:15px;
  border-bottom:1px solid #c9c9c9;
  
}
.wrap-pd{
  padding:40px 15px 51px 15px;
  width:100%;
}
[class*=van-hairline]::after{
  border:0;
}
.btn-login{
  height:40px;
  line-height:40px;
  margin-top:51px;
  font-size:15px;
  background:#c00000;
  border:none;
}

</style>
<style lang="scss">
  .van-toast div{
    font-size:17px;
    color:#fff;
  }
  .van-toast{
    padding:20px 40px!important;
    border-radius:10px!important;
  }
  
  .login{
    .van-field__body{
        input{
        height:60px;
        line-height:60px;
      }
    }
      
  }
</style>