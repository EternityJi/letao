$(function(){
    
  
     $("#loginBtn").click(function(){
      var username = $("#username").val();
      var password = $("#password").val();
      // console.log(username,password);
      // console.log(111);
      if(username === ""){
        mui.toast("请输入用户名");
        return;
      }
      if(password === ""){
          mui.toast("请输入密码");
          return;
      }
            $.ajax({
                  url:"/user/login",
                   type:"post",
                   data:{
                       username:username,
                       password:password
                   },
                   success:function(info){
                        console.log(info);
                        if(info.error){
                            mui.toast("用户名或者密码错误")
                        }
                        if(info.success){
                    // (1) 有传参, 传递了retUrl, 需要跳转回去
                    // (2) 没有传参, 跳转到会员中心页
                    //retUrl=http://localhost:3000/mymobile/product1.html?productId=1
                        if(location.search.indexOf("retUrl") != -1){
                            var retUrl = location.search.replace("?retUrl=","");
                            location.href = retUrl;
                         
                        }else{
                            location.href = "user.html"
                        }
                          
                        }
                        
                   }
            })
     })
    
})