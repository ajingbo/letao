/**
 * Created by Sugar Ma on 2019/6/28.
 */
$(function(){
    var currentPage = 1; //当前页
    var pageSize = 5;    //每页条数

    //定义currentId
    var currentId;
    var isDelete; //标记用户状态

    //一进入页面 发送ajax请求所有用户的数据 进行页面渲染
    //根据全局的currentPage和pageSize进行页面渲染
    function render() {
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:"json",
            success:function(info){
                console.log(info);
                var htmlStr = template("tpl",info);
                $('.lt_content tbody').html(htmlStr);
            }

        })
    }
    render();
})