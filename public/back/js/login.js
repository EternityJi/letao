//校验规则：

// 1. 用户名不能为空
// 2. 用户密码不能为空
// 3. 用户密码长度为6-12位

// bootstrap-validator插件会在表单提交的时候进行校验，
// 如果校验成功了，表单会继续提交，但是如果校验失败了，
// 就会阻止表单的提交。
$(function(){

  //1.表单校验
  $("#form").bootstrapValidator({
  //2. 指定校验时的图标显示，默认是bootstrap风格
  feedbackIcons: {
    valid: 'glyphicon glyphicon-heart',
    invalid: ' glyphicon glyphicon-minus',
    validating: 'glyphicon glyphicon-refresh'
  },

  //3. 指定校验字段
  fields: {
    //校验用户名，对应name表单的name属性
    username: {
      validators: {
        //不能为空
        notEmpty: {
          message: '用户名不能为空'
        },
        //长度校验
        stringLength: {
          min:2,
          max: 6,
          message: '用户名长度必须在4到6之间'
        },
        //正则校验
        regexp: {
          regexp: /^[a-zA-Z0-9_\.]+$/,
          message: '用户名由数字字母下划线和.组成'
        }
      }
    },

  //  密码校验
    password: {
      validators: {
        //不能为空
        notEmpty: {
          message: '密码不能为空'
        },
        //长度校验
        stringLength: {
          min: 6,
          max: 12,
          message: '密码长度必须在6到12之间'
        },
        //正则校验
        regexp: {
          regexp: /^[a-zA-Z0-9_\.]+$/,
          message: '用户名由数字字母下划线和.组成'
        }
      }
    },
  }

});


//2. 注册表单校验成功事件
    //  在事件中阻止默认成功的表单提交,
    //  通过 ajax 进行提交
// 获取元素
// var mes = document.querySelector(".message");
var $mes = $(".message");
// console.log($mes);

// var p  = document.querySelector(".message p");
var $p = $(".message p")

$("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑  
    $.ajax({
     type:"post",
     url:"/employee/employeeLogin",
     data:$("form").serialize(),
     dataType:"json",
     success:function(info){
        console.log(info);
        console.log(info.error);
        if(info.success){
           location.href = "index.html";
        }
        if(info.error == 1000){
            // console.log("用户名错误");
            // alert(info.message);
            $mes.fadeIn(800,function(){
                  $mes.fadeOut(800);
            })
            $p.text(info.message);
        }
        if(info.error == 1001){
            // console.log("密码错误");
            // alert(info.message);
          $mes.fadeIn(800,function(){
                $mes.fadeOut(800);
          })
          $p.text(info.message);
        }
     } 
  })
});

/**
 * 重置表单
重置表单中设置过校验的内容，将隐藏所有错误提示和图标。
 */
$('[type ="reset"]').click(function(){
   // 重置状态
    // resetForm 如果传 true  表示内容和状态都重置
    //           不传参,      只重置状态
     $('#form').data("bootstrapValidator").resetForm();
})
})

