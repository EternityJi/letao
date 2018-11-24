$(function(){
   //功能1  检测是否已经登录过功能
   $.ajax({
        url:"/employee/checkRootLogin",
        type:"get",
        success:function(info){
              console.log(info);
              if(info.error == "400"){
              // 未登录, 拦截到登录页
              // location.href = "login.html";
              }
              if(info.success){
                console.log("该用户已经登录过");
              }
        }
   })
})