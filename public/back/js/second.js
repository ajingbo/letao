/**
 * Created by Sugar Ma on 2019/6/30.
 */
$(function() {
    var currentPage = 1; //当前页
    var pageSize = 5;    //每页条数

    //一进入页面 发送ajax请求进行渲染
    render();
    function render() {
        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:"json",
            success:function(info) {
                console.log(info);
                //在模板里可以任意使用数据对象里面的所有属性
                var htmlStr = template("secondTpl",info);
                $('.lt_content tbody').html(htmlStr);
            }

        })
    }
})