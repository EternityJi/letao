$(function(){
 
    //  点击搜索按钮  获取输入框内容
    $(".btnSearch").click(function(){
      var value = $(".lt_search input").val().trim();
      if( value === ""){
        return;
      }else{
         
      }
      render(value);
    })
    // 判断value值 是否为空  如果为空  则不执行下面的代码
    
    function render(value){
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


   
})