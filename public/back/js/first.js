$(function(){

  //  添加分页
  //1.当前页
  var currentPage = 1;
  var pageSize = 5;
  //一进入页面 就渲染
  render();
  function render(){
      $.ajax({
          url:"/category/queryTopCategoryPaging",
          type:"get",
          data:{
            page:currentPage,
            pageSize:pageSize
          },
          success:function(info){
               console.log(info);
               var str = template("firstmp",info);
               $('tbody').html(str);

               //引用分页插件
               //分页配置
                 // 配置分页
              $(".pagination").bootstrapPaginator({
                bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                currentPage:info.page,//当前页
                totalPages:Math.ceil(info.total /info.size ),//总页数
                // size:"small",//设置控件的大小，mini, small, normal,large
                //当页面被点击时触发
                onPageClicked:function(event, originalEvent, type,page){
                  //为按钮绑定点击事件 page:当前点击的按钮值
                  currentPage = page;
                  render();
                }
              });
          }
      })
  }

    // 添加分类
    // 点击添加分类按钮  发送ajax
    $(".btn_add").click(function(){
      $('#myModal').modal('show')
    })
    $(".btnAdd").click(function(){
      $('#logoutModal').modal('hide');
         //add-top-category
           $.ajax({
               url:"/category/addTopCategory",
               type:"post",
               data:$(".form").serialize,
               success:function(info){
                 console.log(info);
                 if(info.success){
                    console.log("添加分类成功");
                 }
                
               }
             })

    })
  
})