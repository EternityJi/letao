// 分页功能
$(function(){

  //当前页
  var currentPage = 1;
  var pageSize = 5;
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
      var obj = {
           list:info.rows
      }
      console.log(obj);
      var str = template("tmp",obj);
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
          currentPage = page;
          render();
        }
      });
    }
   })
}


 
})


