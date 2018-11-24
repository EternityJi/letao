$(function(){
    // 渲染页面
      var currentPage = 1;//当前页
      var pageSize = 5; //每页的条数
      // 一进入页面 就渲染
      render();
     function render(){
          $.ajax({
              url:"/category/querySecondCategoryPaging",
              type:"get",
              data:{
                 page:currentPage,
                 pageSize:pageSize
              },
              dataType:"json",
              success:function(info){
                  console.log(info);
                    var str = template("secondtpl",info);
                    $('tbody').html(str);
              }
          })
     }
})