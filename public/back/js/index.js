/**
 * Created by Sugar Ma on 2019/6/27.
 */
$(function() {
    //1-柱状图
    // 基于准备好的dom，初始化echarts实例
    var echarts1 = echarts.init(document.querySelector('.echarts_1'));

    // 指定图表的配置项和数据
    var option1 = {
        //柱状图大标题
        title: {
            //标题文本
            text: '2019年注册人数'
        },
        //提示框组件
        tooltip: {
            trigger: 'item'
        },
        //图例
        legend: {
            data:['人数']
        },
        //x轴的刻度
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月"]
        },
        //y轴的刻度，一般不设置 根据数据动态生成
        yAxis: {},
        //数据项列表
        series: [{
            name: '人数',
            type: 'bar',
            data: [1500,359,788,2900,2000,900]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    echarts1.setOption(option1);

    //2-饼图
    // 基于准备好的dom，初始化echarts实例
    var echarts2 = echarts.init(document.querySelector('.echarts_2'));
    option2 = {
        //饼图大标题
        title : {
            text: '热门品牌销售',
            subtext: '2019年7月',//副标题
            x:'center'  //控制标题的位置居中
        },
        //提示框组件
        tooltip : {
            // axis 坐标轴触发
            trigger: 'item',
            // {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        //图例
        legend: {
            // horizontal 可以让图例水平显示
            orient: 'vertical',
            left: 'left',
            data: ['阿迪达斯','耐克','匡威','三叶草','乔丹']
        },
        series : [
            {
                name: '品牌',
                type: 'pie',
                //指定圆的大小
                radius : '55%',
                //圆心的坐标位置
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'阿迪达斯'},
                    {value:310, name:'耐克'},
                    {value:234, name:'匡威'},
                    {value:135, name:'三叶草'},
                    {value:1548, name:'乔丹'}
                ],
                //可以添加阴影效果
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
    echarts2.setOption(option2);

})