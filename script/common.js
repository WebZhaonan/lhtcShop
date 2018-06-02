
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
}
