
var hname = 0;
//初始化
function init() {
  api.readFile({
    path: 'widget://res/common.json'
}, function(ret, err) {
    if (ret.status) {
        hname=JSON.parse(ret.data)
    } else {
        console.log(err.msg);
    }
});
// 判断有无登录
}
function noLogin(){
    api.confirm({
    title: '确认',
    msg: '是否去登陆',
    buttons:['确定','取消']
}, function(ret,err) {
   var index = ret.buttonIndex;
   if(index == 1){
     api.openWin({
         name: 'login',
         url: '../html/login.html',
         pageParam: {
             name: 'test'
         }
     });
   }
});
}
// 刷新页面
function closeWin(){
    api.closeWin({
    });
    window.location.reload()
}
