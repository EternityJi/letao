$(function(){
         
      var id =  getKey("productId") ;
      console.log(id);
      $.ajax({
           url:"/product/queryProductDetail",
           type:"get",
           dataType:"json",
           data:{
               id:id
              },
           success:function(info){
               console.log( info );
               var htmlStr = template("productTpl",info);
               $(".mui-scroll").html( htmlStr );
                  // 渲染完成轮播图结构后, 进行轮播图初始化
                  // 获得slider插件对象
                  var gallery = mui('.mui-slider');
                  gallery.slider({
                    interval:5000 //自动轮播周期，若为0则不自动播放，默认为0；
                  });

                  // 初始化数字框
                  mui('.mui-numbox').numbox()
                }
          
           
      })

    //给尺码注册点击事件  高亮
    $(".lt_main").on("click",".lt_size span",function(){
         $(this).addClass("current").siblings().removeClass("current");
    })
    // 加入购物车功能
      $("#addCart").click(function(){
          //判断尺码有没有选中    输入框的数量是不是为空
          var size = $(".lt_size span.current").text();
          // console.log(size);
          var num = $(".mui-numbox-input").val();
          // console.log(num);
          if(size === null){
              mui.toast("请选择尺码");
              return;
          }

          //   if(num === null){
          //     mui.toast("请选择数量");
          //     return;
          // }
          
          // 发送请求加入购物车
          $.ajax({
               url:"/cart/addCart",
               type:"post",
               data:{
                 productId:id,
                 num:num,
                 size:size
               },
               success:function(info){
                  console.log(info);
                  // 未登录  拦截到登录页  然后 再按照此地址返回回来   可以将当前页面的地址作为参数传递过去
                  if( info.error === 400){
                      location.href = "login.html?retUrl="+location.href;
                  }
                     // 点击加入购物车  弹出提示确认框
                     mui.confirm("添加成功","温馨提示",["去购物车","继续浏览"], function(e){
                            if(e.index == 0){
                                location.href = "cart.html";
                            }   
                     });
               }
          })
         
      })
})