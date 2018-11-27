$(function(){
  // 1. 用户个人信息渲染 (需要当前用户登陆)
  // 发送个人信息的请求, 会有两种响应
  // (1) 当前用户未登录,  响应 error, 提示未登录, 拦截到登录页
  // (2) 当前用户已登录,  响应 当前用户的信息,  进行渲染
   $.ajax({
        url:"/user/queryUserMessage",
        type:"get",
        dataType:"json",
        success:function(info){
          console.log(info);
            if(info.error){
                //  拦截到登录页
                location.href = "login.html";
                return;
            }
            //成功
            var htmlStr = template("userTpl",info);
            $("#userInfo").html(htmlStr);
        }
   })

     $("#logout").click(function(){
          $.ajax({
           url:"/user/logout",
          type:"get",
          dataType:"json",
          success:function(info){
              console.log(info);
              if(info.success){
                  location.href = "login.html"
              }
              // 否则  说明用户已经登录  拿数据 进行信息渲染

          }
     })
         
     })
   
})