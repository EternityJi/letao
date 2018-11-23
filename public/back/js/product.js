$(function(){
    //  商品管理模板渲染
    // 分页
    var currentPage = 1;
    var pageSize = 3;

    render();
   // 页面渲染    
   function render(){
    $.ajax({
         url:"/product/queryProductDetailList",
         type:"get",
         data:{
              page:currentPage,
              pageSize:pageSize
         },
         success:function(info){
              console.log(info);
              var htmlStr = template("productptl",info)
              $("tbody").html(htmlStr);
          //     配置分页
              $(".pagination").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:info.page,
                     totalPages:Math.ceil(info.total/info.size),
                     onPageClicked:function(a,b,c,page){
                           //为按钮绑定点击事件 page:当前点击的按钮值
                           currentPage=page;
                           render();
                         //   console.log(currentPage);
                         //   console.log(page);
                     }
              })
         }
    })
    }
//添加商品功能   /product/addProduct   post
   $(".btn_add").click(function(){
         $("#myModal").modal("show");
         //渲染  二级分类下拉菜单
         $.ajax({
                url:"/category/querySecondCategoryPaging",
                type:"get",
                data:{
                     page:1,
                     pageSize:100
                },
                dataType:"json",
                success:function(info){
                     console.log(info);
                     var htmlStr = template("dropdowntpl",info);
                     $(".dropdown-menu").html(htmlStr)
                }
         })
   })


  })