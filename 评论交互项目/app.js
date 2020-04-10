

//获取核心模块
var fs = require('fs');
var http = require('http');
var url = require('url')

//获取 art-remplate模块
var template = require('art-template')

//定义初始值
var comments = [
    {name:'张三',message:'此评论不可见',dataTime:'2020/05/01'},
    {name:'李四',message:'此评论不可见',dataTime:'2020/05/01'},
    {name:'王五',message:'此评论不可见',dataTime:'2020/05/01'},
]

//创建服务
http
    .createServer(function (request, response) {

        //定义请求路径
        //url.parse(路径，true)  true的作用将query字符串转化为对象  默认为false
        var pathNaneObj = url.parse(request.url,true)
        //路径名
        var pathname = pathNaneObj.pathname;
        
        if(pathname === '/'){
            fs.readFile('./views/index.html',function(error,data){
                if(error){
                    return response.end('404')
                }
                //template.render() 渲染页面
                var res = template.render(data.toString(),{

                    //赋值
                    comments:comments
                })
                response.end(res)
            })
        }else if(pathname === '/post'){
            fs.readFile('./views/post.html',function(error,data){
                if(error){
                    return response.end('404')
                }
                response.end(data)
            })

        }else if(pathname === '/pinglun'){
            //获取query对象
            var con = pathNaneObj.query;
            comments.unshift(con);
            console.log(con)

            //重定向
            response.statusCode = 302;
            response.setHeader('Location','/');
            response.end();
        }else if(pathname.indexOf('/public/') === 0){
            fs.readFile('.'+pathname,function(error,data){
                if(error){
                    response.end('访问失败')
                }
                response.end(data)
            })
        }else{
            fs.readFile('./views/404.html',function(error,data){
                response.end(data)
            })
        }
    })

    //监听，获取端口号
    .listen(3631, function () {
        console.log('server is running...')
    })


    //思路：
    //1.引入核心模块 fs http url,安装模板引擎 npm install art-template --save 之后引入art-templates模块
    //2.定义页面的初始值
    //3.创建服务 通过url.parse()方法，获取路径，讲query字符串转成对象
    //4.通过if写跳转页面 '/'  '/post'  '/pinglun'  '其他', fs.readFile()读取文件
        //(1) 写'/'时要通过template.render()来渲染页面
        //(2)写'pinglun'时，先获取query对象，通过unshift()方法添加到comments数组中
    //5.通过listen监听，绑定端口号




    