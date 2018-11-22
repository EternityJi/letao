
$(function(){
  //1. 分页功能
  //当前页
  var currentPage = 1;
  var pageSize = 5;

  var id;
  var isDelete;
  //1.一进入页面就进行渲染
  render();

function render(){
  $.ajax({
    url:"/user/queryUser",
    type:"get",
    data:{
      // page:page || 1,
      // pageSize:5
      page:currentPage,
      pageSize:pageSize
    },
    success:function(info){
      console.log(info);
        // 参数2 必须是一个对象
        // 在模板中可以任意使用对象中的属性
        // isDelete 表示用户的启用状态, 1就是启用, 0就是禁用
       //   console.log(info.rows);
      // console.log(obj);
      var str = template("tmp",info);
      $('tbody').html(str);
       
      // 配置分页
      $(".pagination").bootstrapPaginator({
        bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
        currentPage:info.page,//当前页
        totalPages:Math.ceil(info.total /info.size ),//总页数
        // size:"small",//设置控件的大小，mini, small, normal,large
        //当页面被点击时触发
        onPageClicked:function(event, originalEvent, type,page){
          //为按钮绑定点击事件 page:当前点击的按钮值
          //console.log(page);
          currentPage = page;//更新当前页
          //点击的时候根据当前页重新点击数据进行渲染
          render();
        }
      });
    }
   })
}
  
  // 2.更新用户状态update-user
  // 用事件委托   给操作按钮注册事件
  $('.main tbody').on("click",".btn",function(){
       //弹出模态框
    $('#disableModal').modal("show");
        // 用户的当前id
        //因为要在下面用  所以写成全局的·
       id=$(this).parent().data("id");
        // console.log($(this).parent().data("id"));
       //isDelete 根据isDelete 来判断状态  根据类名来判断
       isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
      //  console.log(isDelete);
      //  console.log(id);
       
  })
     //点击确定按钮,发送请求  修改启用 禁用
  $(".submitBtn").click(function(){
    // console.log(id);
    // console.log(isDelete);
    $.ajax({
      type: "post",
      url: "/user/updateUser",
      data: {
        id: id, // 用户id
        isDelete: isDelete // 将用户改成什么状态, 1启用, 0禁用
      },
      // dataType: "json",
      success: function( info ) {
        console.log( info )
        if ( info.success ) {
          // 关闭模态框
          $('#disableModal').modal("hide");  // show hide
          // 重新渲染页面
          render();
        }
      }
    })



  })
   
 
 
})


