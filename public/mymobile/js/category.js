$(function(){
      // 一进入页面 开始进行渲染
      // var id;
    
      $.ajax({
           url:"/category/queryTopCategory",
           type:"get",
           dataType:"json",
           success:function(info){
              console.log(info);
              var htmlStr = template("leftTpl",info);
              $(".lt_category_left ul").html(htmlStr);
             
           }
      })

      // 给左边的a注册点击事件  切换到右边的菜单 
      // 用事件委托
      $(".lt_category_left ul").on("click","a",function(){
            //点击哪一个使哪一个 显示高亮  加current类
            // $(this).addClass("current").parent().siblings().find("a").removeClass("current");
             var id = $(this).data("id");
            // console.log(id);
            renderSecondByid(id)
          
      })

      // 根据左侧的id  渲染右侧的菜单
       function renderSecondByid(id){
              $.ajax({
                url:"/category/querySecondCategory",
                type:"get",
                data:{id:id},
                dataType:"json",
                success:function(info){
                  console.log(info);
                  var htmlStr = template("rightTpl",info);
                  $(".lt_category_right ul").html(htmlStr)
                }
        })
       }
     
})