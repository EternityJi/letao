$(function(){

  //  添加分页
  //1.当前页
  var currentPage = 1;
  var pageSize = 5;
  var categoryId;
  //一进入页面 就渲染
  render();
  function render(){
      $.ajax({
          url:"/category/querySecondCategoryPaging",
          type:"get",
          data:{
            page:currentPage,
            pageSize:pageSize
          },
          success:function(info){
               console.log(info);
               var str = template("secondtpl",info);
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

    // 2.添加分类
    // 点击添加分类按钮  发送ajax
    $(".btn_add").click(function(){
      $('#myModal').modal('show');
      // 请求ajax 数据  用来渲染二级分类下拉框
      // 使用 page  pageSize 来模拟 
      $.ajax({
          url:"/category/queryTopCategoryPaging",
          type:"get",
          data:{
            page:1,
            pageSize:100,
          },
          dataType:"json",
          success:function(info){
                console.log(info);
            var htmlStr = template("dropdowntpl",info);
            $(".dropdown-menu").html(htmlStr);
          }

      })

    })

    // 3. 给下拉菜单添加选中功能 (事件委托)
     $(".dropdown-menu ").on("click","a",function(){
          //获取a 的文本
          var txt = $(this).text();
          $(".btninfo").text(txt);
          categoryId = $(this).data("id");
          $('[name="categoryId"]').val(categoryId);
     })
 
    //4.图片上传  用插件
    $('#fileupload').fileupload({
      dataType: "json", // 返回回来的数据类型
      done: function(e, data) {
        console.log( data );
        var result = data.result; // 后台返回的结果
        // 获取图片地址, 赋值给 img 的 src
        var picUrl = result.picAddr;
        console.log(picUrl);
        $(".imgbox img").attr("src", picUrl);
        $('[name="brandLogo"]').val(picUrl)
        
        
      }
});
   //5.表单内容上传
  
   
   $(".btnAdd").click(function(){
    // console.log($("#form").serialize());
    $('#myModal').modal('hide');
        $.ajax({
          url:"/category/addSecondCategory",
          type:"post",
          dataType:"json",
          data:$("#form").serialize(),
          success:function(info){
             console.log(info);

             render();
          }  
        })
        
   })
    // //3.表单校验功能
    $("#form").bootstrapValidator({
    //       //1.指定图标  默认是bootstrap风格
          feedbackIcons:{
             valid:'glyphicon glyphicon-heart',//有效的图标
             invalid: ' glyphicon glyphicon-minus',//无效的图标
             validating:'glyphicon glyphicon-refresh'//校验中
          },
          //指定校验字段
          fields:{
            categoryName:{
              //校验规则
                validators:{
                  //不能为空
                  notEmpty: {
                    message: '二级分类不能为空'
                  },

                }
            }
          }
    });

    // add-second-category 添加二级分类

    //注册表单校验成功事件   阻止默认的表单提交  通过ajax提交
    $("#form").on("success.form.bv",function(e){   
    //       //阻止默认的提交
        e.preventDefault();
    //     //通过ajax提交
        // $.ajax({
        //      type:"post",
        //      url:"/category/addTopCategory",
        //      data:$("#form").serialize(),
        //      dataType:"json",
        //      success:function(info){
        //           console.log(info);
        //           if(info.success){
        //                //添加成功
        //                //关闭模态框
        //                $("#myModal").modal("hide");
        //                //重新渲染当前页  从第一页开始渲染
        //                currentPage =1;
        //                render();

        //                //内容和状态都要重置
        //                $("#form").data("bootstrapValidator").resetForm(true);
        //           }
        //      }
        // })

        

    })
    

})