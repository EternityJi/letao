$(function(){
      // 基于准备好的dom，初始化echarts实例
      var echarts_left = echarts.init(document.querySelector('.echarts_left'));

      // 指定图表的配置项和数据
      var option = {
          title: {
              text: '2017年注册人数'
          },
          // 提示框组件
          tooltip: { show : true},
            // 图例
          legend: {
              data:['人数']
          },
          //x轴
          xAxis: {
              data: ["1月","2月","3月","4月","5月","6月"]
          },
          //y轴
          
          yAxis: {},
          series: [{
              name: '人数',
              type: 'bar',// bar 表示柱状图  line 表示折线图  pie 饼图
              data: [1000, 1500, 1800, 1200, 1000, 500]
          }]
      };

      // 使用刚指定的配置项和数据显示图表。
      echarts_left.setOption(option);




      //右侧饼图
      var echarts_right = echarts.init(document.querySelector('.echarts_right'));

      option = {
        title : {
            text: '热门品牌销售',
            // 副标题文本
            subtext: '2018年11月',
            // 控制水平方向的位置
            x:'center',
            textStyle: {
              fontSize: 25,   // 字体大小
              color: "#e92322"  // 字体颜色
            }
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
             data: ['耐克','阿迪','阿迪王','老北京','老太太']
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'耐克'},
                {value:310, name:'阿迪'},
                {value:234, name:'阿迪王'},
                {value:135, name:'老北京'},
                {value:1548, name:'老太太'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
     // 使用刚指定的配置项和数据显示图表。
     echarts_right.setOption(option);

    
})