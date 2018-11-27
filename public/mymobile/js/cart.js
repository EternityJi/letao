$(function(){
    render();
   function render(){
    $.ajax({
      url:"/cart/queryCart",
      type:"get",
      dataType:"json",
      success:function(info){
         console.log(info);
         var obj={
             list:info
         }
       $(".mui-table-view").html(template("cartTpl",obj));
      }
 })

   }
 
    // 删除对应的数据
   
    $(".mui-table-view").on("click",".btn_delete",function(){
         var id = [];
        id.push($(this).data("id"));

         console.log(id);
          $.ajax({
            url:"/cart/deleteCart",
            type:"get",
            dataType:"json",
            data:{
                id:id
            },
            success:function(info){
              console.log(info);
              if(info.success){
                 render();
              }
            }
   })
           
    })
      
 
    })
   

