$(function(){
  // 要渲染历史记录, 要先读取历史记录, 下面都是进行历史记录存取操作
  // 我们需要约定一个键名, search_list

  // 将来下面三句话, 可以放在控制台执行, 进行假数据初始化
  // var arr = [ "耐克", "李宁", "新百伦", "耐克王", "阿迪王" ];
  // var jsonStr = JSON.stringify( arr );
  // localStorage.setItem( "search_list", jsonStr );


  // 功能1: 历史记录渲染功能
  // (1) 读取本地历史, 得到 jsonStr
  // (2) 将 jsonStr 转换成 数组
  // (3) 通过数组, 进行页面渲染(模板引擎)

    render();
  // var arr = ["1","2","3","4"];
  // var jsonStr = localStorage.setItem("search_list",)
  // var jsonStr = localStorage.getItem(JSON.stringify(str));
  // var arr = JSON.parse(jsonStr);
     function getHistory(){
          //先获取到localStorage的数据  
          var jsonStr = localStorage.getItem("search_list")||'[]';
          var arr = JSON.parse(jsonStr);//转成数组
          return arr;
     }


  //  渲染历史记录
    
    function render(){
      var arr = getHistory();
      var htmlStr = template("historyTpl",{ arr:arr});
      $(".lt_history").html(htmlStr); 
    }


    // 点击清空按钮 
  //将数据删除
  $(".lt_history").on("click",".btnempty",function(){
      mui.confirm("你确定要清空历史记录嘛?"),"温馨提示",console(e);
      if(e.index === 1 ){
            localStorage.removeItem("search_list");
            // 重新渲染
            render();
      }
  });

  // 删除单条记录
  $('.lt_history').on("click", ".btn-delete", function() {
    var that = this;
  
    mui.confirm("你确定要删除该条记录嘛", "温馨提示", ["取消", "确认"], function( e ) {

      if ( e.index === 1 ) {
        // 点击确认按钮

        // 获取下标
        var index = $(that).data("index");
        // 获取数组
        var arr = getHistory();
        // 根据下标删除某项
        // splice( 从哪开始, 删几个, 添加的项1, 添加的项2, ..... );
        arr.splice( index, 1 );

        // 转成 jsonStr 存入本地存储
        var jsonStr = JSON.stringify( arr );
        localStorage.setItem("search_list", jsonStr );

        // 重新渲染
        render();

      }

    })



  });


  // // 功能4: 点击搜索按钮, 添加搜索记录
  // (1) 给 搜索按钮 注册点击事件
  // (2) 获取搜索框的内容
  // (3) 读取本地存储, 拿到数组
  // (4) 将搜索框的内容, unshift 到数组的最前面
  // (5) 将数组转成jsonStr, 存到本地存储中
  // (6) 重新渲染
  $(".btnSearch").click(function(){
          var content = $(".lt_search input").val();
          // var jsonStr = localStorage.getItem("search_list");
          // var arr = JSON.parse(jsonStr);
      if(content.trim() == ""){
        mui.toast("请输入搜索关键字", {
          duration: 2500
        });
        return;
      }
          //获取数组
          var arr = getHistory();
          // 判断是否重复
          if( arr.indexOf(content) > -1){
              // 说明存在
              // 就删除
              arr.splice( arr.indexOf(content),1)
          }
           if(arr.length>=10){
               arr.pop();
           }
          arr.unshift(content);

          localStorage.setItem("search_list",JSON.stringify(arr));

          // 重新渲染
          render();
          // 重置输入输入框
          $(".lt_search input").val("");
          
          location.href="search_list.html?key="+content;
  })
   
})