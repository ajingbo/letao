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

                //分页初始化
                $('#paginator').bootstrapPaginator({
                    //指定bootstrap的版本
                    bootstrapMajorVersion: 3,
                    //总页数
                    totalPages:Math.ceil(info.total/info.size),
                    //当前页
                    currentPage:info.page,
                    //给所有的按钮添加页码点击事件
                    onPageClicked:function(a,b,c,page){
                        //更新当前页
                        currentPage = page;
                        //重新渲染
                        render();
                    }

                })
            }

        })
    }
    render();

    //2-给所有禁用启用按钮 添加点击事件（通过事件委托绑定）
    $('tbody').on('click',".btn",function() {
        //console.log("按钮被点击了");
        //显示模态框
        $('#userModal').modal("show");
        //通过自定义属性 获取td中存在的用户ID 并保存在全局变量中
        currentId = $(this).parent().data("id");
        //1 启用 0 禁用
        //通过判断类名 决定需要传递给后台isDelete
        // 如果是禁用按钮, 想要禁用该用户, 就是将该用户状态, 变成 0, 传 0
        isDelete = $(this).hasClass("btn-danger")? 0 : 1;
     //3-点击模态框的确定按钮 实现启用禁用 切换
        $('#submitBtn').click(function(){
            console.log("切换启用禁用状态");
            //发送ajax请求
            $.ajax({
                type:"post",
                url:"/user/updateUser",
                data:{
                    id:currentId,
                    isDelete:isDelete
                },
                dataType:"json",
                success:function(info) {
                    console.log(info);
                    if(info.success){
                        //修改状态成功
                        //关闭模态框
                        $('#userModal').modal('hide');
                        //页面重新渲染
                        render();
                    }
                }
            })
        })

    })
})