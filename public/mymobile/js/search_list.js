$(function(){
     var value = getKey("key");
    //  console.log(value);
  $(".lt_search input").val(value);
  render(); 
    //  点击搜索按钮  获取输入框内容
    $(".btnSearch").click(function(){
 
       setTimeout(function(){
            render();
       },1000)
     
    })
    // 判断value值 是否为空  如果为空  则不执行下面的代码
    
    function render(){
    // 在发送请求, 重新渲染前, 由于请求是需要时间的, 所以这时候应该显示加载中的效果
      // $(".lt_product").html( '<div class="loading"></div>');
      $.ajax({
        url:"/product/queryProduct",
        type:"get",
        data:{
            page:1,
            pageSize:100,
            proName:$(".lt_search input").val().trim()
        },
        success:function(info){
          console.log(info);
          var htmmlStr = template("productTpl",info)
          $(".lt_product ul").html(htmmlStr);
          var htmmlStr = template("productTpl",info);
                 $(".lt_product ul").html(htmmlStr);
        }
      })
   }

      // 

   
})