$(function(){
     var value = getKey("key");
     console.log(value);
  $(".lt_search input").val(value);
  //一进入页面  渲染一次
  render(); 
    //  点击搜索按钮  获取输入框内容
    $(".btnSearch").click(function(){
            render();
    })
  //  事件委托  显示高亮
  // 是否有current类  如果有的 话   点击切换箭头的方向
  //如果没有的话  就添加current  
  $(".lt_search_nav").on("click","a",function(){
      if($(this).hasClass("current")){
        $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
      }else{
        $(this).addClass("current").siblings().removeClass("current");
      }
      render();
  })
  

   
    
    
    function render(){
    // 在发送请求, 重新渲染前, 由于请求是需要时间的, 所以这时候应该显示加载中的效果
      $(".lt_product").html( '<div class="loading"></div>');
      var paramsObj = {};
      paramsObj.page=1;
      paramsObj.pageSize=100;
      paramsObj.proName=$(".lt_search input").val().trim();

      // 排序
      //根据价格和库存进行排序
      // 根据是否有高亮的 a 决定是否需要排序
      // 额外的两个可传的参数
      //num 和 price 用同样的方法   自定义属性   data-type  获取后用来传参
      var $current = $(".lt_search_nav a.current");
      // console.log($current.find("i"));
      // console.log(current.length);
      if($current.length === 1){
          var sortName = $current.data("type");
         
          // console.log(price);
          var sortId = $current.find("i").hasClass("fa-angle-down") ? 2: 1;
          //添加参数到paramsObj 中  一个对象访问外部变量作为自己的属性 用中括号语法
          paramsObj[sortName ]=sortId;
          // console.log( paramsObj);
      }
      
  setTimeout(function(){
    $.ajax({
      url:"/product/queryProduct",
      type:"get",
      data:paramsObj,
      success:function(info){
        console.log(info);
        var htmmlStr = template("productTpl",info)
        $(".lt_product ul").html(htmmlStr);
        var htmmlStr = template("productTpl",info);
              $(".lt_product").html(htmmlStr);
              
      }
    })
  },500)
    
     }
  
  

   
})