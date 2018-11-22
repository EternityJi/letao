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

    // 2.添加分类
    // 点击添加分类按钮  发送ajax
    $(".btn_add").click(function(){
      $('#myModal').modal('show')
    })

    //3.表单校验功能
    $("#form").bootstrapValidator({
          //1.指定图标  默认是bootstrap风格
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
                    message: '一级分类不能为空'
                  },

                }
            }
          }

    });
    //注册表单校验成功事件   阻止默认的表单提交  通过ajax提交
    $("#form").on("success.form.bv",function(e){   
          //阻止默认的提交
        e.preventDefault();
        //通过ajax提交
        $.ajax({
             type:"post",
             url:"/category/addTopCategory",
             data:$("#form").serialize(),
             dataType:"json",
             success:function(info){
                  console.log(info);
                  if(info.success){
                       //添加成功
                       //关闭模态框
                       $("#myModal").modal("hide");
                       //重新渲染当前页  从第一页开始渲染
                       currentPage =1;
                       render();
                  }
             }
        })

        

    })
    

})