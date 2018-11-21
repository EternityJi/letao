$(function(){
  // 开启进度条功能
  //1.在ajax请求数据时  开启进度条
  //2.ajax请求数据结束后  关闭进度条
  $(document).ajaxStart(function () {
    NProgress.start();
  });
 
  $(document).ajaxStop(function() {
    // 模拟网络延迟
    setTimeout(function() {
      // 关闭进度条
      NProgress.done();
    }, 500)
  });
   //共用的功能
   //功能1 左侧二级切换菜单
   $(".nav .slide").click(function(){
       $(".child").stop().slideToggle();
   })
    //2.左侧菜单切换功能
    $("header .icon_menu").click(function(){
        $(".lt_sides").toggleClass("hidemenu");
        $(".ri_main header").toggleClass("hidemenu");
        $(".ri_main").toggleClass("hidemenu");

    })
    //3.退出登录功能
    $("header .icon_logout").click(function(){
      // 点击按钮  模态框显示
      $('#logoutModal').modal('show')
          
    })
    $(".logoutBtn").click(function(){
      $('#logoutModal').modal('hide')
         // employee-logout
          //  公共退出登录状态功能
           $.ajax({
               url:"/employee/employeeLogout",
               type:"get",
               success:function(info){
                 console.log(info);
                 if(info.success){
                  location.href = "login.html";
                 }
                
               }
             })

    })
  


})