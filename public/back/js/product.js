$(function(){
    //  商品管理模板渲染
    // 分页
    var currentPage = 1;//当前页
    var pageSize = 3;//一页有多少条
    var brandId ;
    var picArr = [];//专门用来保存图片对象
    // 已进入页面就进行渲染 
    render();
   
   //并进行分页   
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

  //上架 下架切换 通过类名判断  用事件委托
//   $("tbody").on("click",".btn",function(){
//      $("#updateModal").modal("show");
//      statu = $(this).hasClass("btn-danger") ? 1 : 0;
//   })
//   $(".submitBtn").click(function(){
//      $("#updateModal").modal("hide");
    
//   })


//1.添加商品功能   /product/addProduct   post
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
   //common.js
   //2.下拉框同步按钮内容
   //事件委托  注册同步事件
   $(".dropdown-menu").on("click","a",function(){
          $(".btninfo").text($(this).text());
          brandId = $(this).data("id");
          $('[name="brandId"]').val(brandId);
     //      - 问题1：隐藏的表单没有做校验excluded:[],
     //     - 问题2：隐藏域在选择的时候，并没有变成校验成功
        $("#form").data("bootstrapValidator").updateStatus("brandId", "VALID");
   })
   //.图片上传  用插件
     $("#fileupload").fileupload({
          dataType:"json",
          //e：事件对象
          //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址

          //上传完图片  响应的回调函数配置
          //每一张图片上传  都会响应一次
          done:function (e, data) {
          console.log(data);
          // var result = data.result; // 后台返回的结果
          //获取的图片地址对象
          var picObj = data.result;
          console.log(picObj);
          
          //获取图片地址对象
          var picAddr = picObj.picAddr;
          //新得到的图片对象  应该推到数组的最前面
          //push pop shift unshift
          picArr.unshift(picObj);
          console.log(picAddr);
          
          //新的图片  应该添加到imgBox 最前面去
          // $("#imgBox").prepend('<img src="'+ picAddr+'" width = "100">');
          $('#imgBox').prepend('<img src="'+ picAddr +'" width="100">');
          //如果上传的图片个数大于3个   需要将最旧的那个(最后面的那项) 要删除
          if( picArr.length > 3){
             //删除数组的最后一项
             picArr.pop();
             //除了删除数组的最后一项  还需要将页面中渲染的最后一张图片删除掉
             //通过 last-of-type  找到imgBox盒子中最后一个img 类型的标签 删除
             $("#imgBox img:last-of-type").remove();
          }
           //如果处理后  图片数组的长度为3  说明已经选择了三张图片  可以进行提交
           //需要将表单 picStatus的校验状态  置成VALID
           if(picArr.length === 3){
             $("#form").data("bootstrapValidator").updateStatus("picStatus","VALID")  
           }
         
          }
     });
   //3.进行表单校验
   //初始化表单校验插件
      //1.使用表单校验插件
     $("#form").bootstrapValidator({
               //不校验的类型  默认是   excluded: [':disabled', ':hidden', ':not(:visible)'],现在进行重置
           excluded:[],
          //2.指定校验时的图标  默认是bootstrap风格
          feedbackIcons: {
               valid:'glyphicon glyphicon-ok',
               invalid:'glyphicon glyphicon-remove',
               validating:'glyphicon glyphicon-refresh'
          },
          //3.指定校验字段
    fields:{
          //校验表单中 input中的name属性
          brandId:{
               // 校验规则
               validators:{
                    //不能为空
                    notEmpty: {
                      message: "请选择二级分类"
                    }
  
                  }
          },
          proName:{
               // 校验规则
               validators:{
                    //不能为空
                    notEmpty: {
                      message: "商品名称不能为空"
                    }
                  }
          },
          proDesc:{
               // 校验规则
               validators:{
                    //不能为空
                    notEmpty: {
                      message: "商品描述不能为空"
                    }
                  }
          },
          num:{
               // 校验规则
               validators:{
                    //不能为空
                    notEmpty: {
                      message: "请输入商品库存"
                    },
                    regexp: {
                         regexp: /^[1-9]\d*$/,
                         message: '商品库存格式,必须是非零开头的数字'
                       }
                  }
          },
          size:{
               // 校验规则
               validators:{
                    //不能为空
                    notEmpty: {
                      message: "请输入商品尺码"
                    },
                    regexp: {
                         regexp: /^\d{2}-\d{2}$/,
                         message: '尺码格式, 必须是 32-40'
                       }
                  }
          },
          oldPrice:{
               // 校验规则
               validators:{
                    //不能为空
                    notEmpty: {
                      message: "请输入商品原价"
                    }
                  }
          },
         price:{
               // 校验规则
               //标记图片是否上传3张图片
               validators:{
                    //不能为空
                    notEmpty: {
                      message: "请输入商品现价"
                    }
                  }
          },
          picStatus:{
               // 校验规则
               validators:{
                    //不能为空
                    notEmpty: {
                      message: "请上传3张图片"
                    }
                  }
          },
     } 
 })
    //注册表单验证成功事件 
    //当表单校验成功时  会触发success.form.bv事件 此时会提交表单  这时候需要禁止表单的自动提交  使用ajax进行表单的提交。
   
    $("#form").on("success.form.bv",function(e){
     e.preventDefault();
     //  $('#form').serialize() 只能将页面中存在的表单元素中的提交内容拼接, 需要拼接上 picName1 ....brandId=1&num=2&picAddr1=xx&picName1=xx&picAddr2=xx&picName2=xx&picAddr3=xx&picName3=xx

     var params = $("#form").serialize();
     params += "&picName1="+picArr[0].picName + "&picAddr1="+picArr[0].picAddr ;
     params += "&picName2="+picArr[1].picName + "&picAddr2="+picArr[1].picAddr ;
     params += "&picName3="+picArr[2].picName + "&picAddr3="+picArr[0].picAddr ;
      
          console.log($("#form").serialize());
          //用ajax提交
          $.ajax({
               url:"/product/addProduct",
               type:"post",
               dataType:"json",
               data:params,
               success:function(info){
                     console.log(info);
                     if(info.success){
                            //关闭模态框
                            $("#myModal").modal("hide");
                            //重置校验状态和文本内容
                            $("#form").data('bootstrapValidator').resetForm(true);
                            currentPage =1;
                            render();
                            //手动重置 下拉菜单
                            $("#dropdownText").text("请选择二级分类");
                            //删除结构中的所有图片
                            $("#imgBox img").remove();
                            //重置数组  picArr
                            picArr = [];
                     }
               }

          })
    })
     
      
  


  })