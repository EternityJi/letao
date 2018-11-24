$(function () {
  // 渲染页面
  var currentPage = 1; //当前页
  var pageSize = 5; //每页的条数
  // 一进入页面 就渲染
  render();
  function render() {
    $.ajax({
      url: "/category/querySecondCategoryPaging",
      type: "get",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        console.log(info);  
        var str = template("secondTpl", info);
        $('tbody').html(str);
        // 配置分页
        $(".pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page, //当前页
          totalPages: Math.ceil(info.total / info.size), //总页数
          // size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked: function (a, b, c, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }

        });

      }
    })
  }

  // //  点击添加按钮 下拉菜单渲染
  $(".btnAdd").click(function () {
    $('#myModal').modal('show');
    $.ajax({
      url: "/category/queryTopCategoryPaging",
      type: "get",
      // page pageSize 用的模拟的数据
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        console.log(info);
        $(".dropdown-menu").html(template("dropdownTpl", info));
      }
    })
  })


  // 注册委托事件  点击下拉菜单的a 改变上面按钮的内容
      $(".dropdown-menu").on("click","a",function(){
           $(".dropdownBtn").text($(this).text());
           // 拿到 categoryId
           var id = $(this).data("id");
           $('[name="categoryId"]').val(id);
           //重置隐藏域正确时校验状态
           $("#form").data('bootstrapValidator').updateStatus("categoryId", "VALID"); 
      })



  //    // 同步图片  用插件
     $("#fileupload").fileupload({
      dataType:"json",
      //e：事件对象
      //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
      done:function (e, data) {
        console.log(data.result);
        var result = data.result; // 后台返回的结果
        var picUrl = result.picAddr;
         // 设置图片地址  
         $('.imgBox img').attr("src",picUrl);
        //  name = brandLogo
        $('[name ="brandLogo"]').val(picUrl);
        $("#form").data('bootstrapValidator').updateStatus("brandLogo", "VALID");
      }
  })
  // //   //进行表单校验
    $("#form").bootstrapValidator({
         //修改默认校验  将隐藏域也校验
         excluded:[],
         //校验时的图标显示
         feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',
          invalid: 'glyphicon glyphicon-remove',
          validating: 'glyphicon glyphicon-refresh'
        },
       // 指定校验字段
       fields: {
        //校验用户名，对应name表单的name属性
        categoryId: {
          validators: {
            //不能为空
            notEmpty: {
              message: '请选择一级分类'
            },




          }
        },
        brandName: {
          validators: {
            //不能为空
            notEmpty: {
              message: '请选择一级分类'
            },
          }
        },
        brandLogo: {
          validators: {
            //不能为空
            notEmpty: {
              message: '请选择一级分类'
            },
          }
        },
      } 

    })

  
  //   // // 注册成功校验的事件  阻止默认的事件
    $("#form").on('success.form.bv', function (e) {
      e.preventDefault();
      console.log($("#form").serialize());
         
    //   //使用ajax提交逻辑
      $.ajax({
          url:"/category/addSecondCategory",
          type:"post",
          data:$("#form").serialize(),
          dataType:"json",
          success:function(info){
             console.log(info);
             if(info.success){
             
              //模态框消失
              $("#myModal").modal("hide");
              currentPage = 1;
              render();
             //  重置表单
             $("#form").data('bootstrapValidator').resetForm(true);
             // 重置下拉菜单
             $(".dropdownBtn").text("请输入一级菜单");
             //重置图片
             $("#imgBox img").attr("src","../images/li.jpg");
             }

          }
      })
     });

})