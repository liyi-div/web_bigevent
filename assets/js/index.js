$(function(){
    // 调用 getUserInfo 获取用户的基本信息
    getUserInfo()
    // 退出
    var layer = layui.layer
    $('#btnLogout').on('click',function(){
        // 利用layui的内置组件，提示用户是否退出
        layer.confirm('确定退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            // 清空本地存储中的token
            localStorage.removeItem('token')
            // 重新跳转到登录页
            location.href='/login.html'
            layer.close(index);
          });
    })
})

// 获取用户个人信息
function getUserInfo(){
    $.ajax({
        method:'get',
        url:'/my/userinfo',
        // headers 就是请求头配置
        // headers:{
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success:function(res){
            if(res.status!=0){
                return layer.msg('获取用户信息失败')
            }
            // console.log(res);
            // 调用渲染头像的方法
            renderAvatar(res.data)
        },
        // 不论请求是否成功，最终都会调用complete回调函数
        // complete:function(res){
        //     // console.log(res);
        //     // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败'){
        //         // 强制清空token
        //         localStorage.removeItem('token')
        //         // 回到主页
        //         location.href='/login.html'
        //     }
        // }
    })
}

// 渲染头像
function renderAvatar(user){
    // 获取用户的名称
    var name = user.nickname || user.username
    // 设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
    // 渲染用户的头像
    if(user.user_pic!=null){
        // 渲染图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else{
        // 渲染文本头像
        $('.layui-nav-img').hide()
        var first_str = name[0].toUpperCase()
        $('.text-avatar').html(first_str).show()
    }
}