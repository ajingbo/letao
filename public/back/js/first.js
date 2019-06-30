/**
 * Created by Sugar Ma on 2019/6/30.
 */
$(function() {
    var currentPage = 1;
    var pageSize = 5;

    render();
    //1-一进入页面 发送ajax请求 请求一级分类数据 进行页面渲染
    function render(){
        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:"json",
            success:function(info){
                console.log(info);
                var htmlStr = template("firstTpl",info);
                $('.lt_content tbody').html(htmlStr);

                //分页插件初始化
                $('#paginator').bootstrapPaginator({
                    //指定bootstrap版本号
                    bootstrapMajorVersion:3,
                    //当前页
                    currentPage:info.page,
                    //总页数
                    totalPages:Math.ceil(info.total/info.size),
                    //给页码添加点击事件
                    onPageClicked:function(a,b,c,page){
                        //更新当前页 重新渲染
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }

    // 2. 点击添加分类按钮, 显示添加模态框
    $('#addBtn').click(function() {
        //显示添加模态框
        $('#addModal').modal('show');
    });

    // 3-添加表单检验功能
    $('#form').bootstrapValidator({
        //配置检验图标
        feedbackIcons:{
            // 校验成功
            valid:'glyphicon glyphicon-ok',
            // 校验失败
            invalid:'glyphicon glyphicon-remove',
            // 校验中
            validating:'glyphicon glyphicon-refresh'
        },
        //字段列表
        fields:{
            categoryName:{
                //校验规则 非空
                validators:{
                    notEmpty:{
                        message:"请输入一级分类名称"
                    }
                }
            }
        }
    });
    // 4-添加表单校验成功事件  阻止默认的表单提交 通过ajax进行提交
    $('#form').on("success.form.bv",function(e){
        //阻止默认的提交
        e.preventDefault();
        //通过ajax提交
        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data:$('#form').serialize(),
            dataType:"json",
            success:function(info) {
                console.log(info);
                if(info.success) {
                    //添加成功
                    //关闭模态框
                    $('#addModal').modal("hide");
                    //重新渲染第一页
                    currentPage = 1;
                    render();
                    //重置表单内容 状态
                    $('#form').data("bootstrapValidator").resetForm(true);
                }
            }
        })
    })


});