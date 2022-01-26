// 每次调用 $.get() 或 $.post()或$.ajax() 的时候，会先调用ajaxPreffilter 这个函数
// 在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options){
    // 在真正的ajax请求之前，统一拼接请求的根路径
    options.url = 'http://127.0.0.1:8081' + options.url
    console.log(options.url);
})