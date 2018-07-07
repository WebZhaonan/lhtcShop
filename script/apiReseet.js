function fnopenactionSheet() {
  // 打开学历选择
  var Button = ['2000-4000', '3000-5000', '5000-8000','8000-12000','面议'];
  api.actionSheet({
  title: '请选择月薪',
  cancelTitle: '取消',
  buttons: Button
  }, function(ret, err) {
  var index = ret.buttonIndex;
  if(index != 6){
  var yeraMon = $api.byId('yeraMon')
  var bHtml = Button[index-1]
  $api.val(yeraMon,bHtml);
  $api.css(yeraMon,'color:#2d2d2d;');
}
});
}
function fnopenactionSheet1() {
  // 打开学历选择
  var Button = ['初中及高中', '大专', '本科','其他'];
  api.actionSheet({
  title: '请选择学历',
  cancelTitle: '取消',
  buttons: Button
  }, function(ret, err) {
  var index = ret.buttonIndex;
  if(index != 5){
  var xl = $api.byId('xl')
  var bHtml = Button[index-1]
  $api.val(xl,bHtml);
  $api.css(xl,'color:#2d2d2d;');
}
});
}
function fnopenactionSheet2() {
  // 打开工作经验选择
  var Button = ['1年以下', '1-3年', '3-5年','5-10年','10年以上'];
  api.actionSheet({
  title: '请选择工作经验',
  cancelTitle: '取消',
  buttons: Button
  }, function(ret, err) {
  var index = ret.buttonIndex;
  if(index != 6){
  var Job = $api.byId('Job')
  var bHtml = Button[index-1]
  $api.val(Job,bHtml);
  $api.css(Job,'color:#2d2d2d;');
}
});
}
//打开地图
// function choseAdd(){
//    api.openWin({
//        name: 'Ditu_win',
//        url: './Ditu_win.html',
//        pageParam: {
//            name: 'test'
//        }
//    });

//   var systemType = api.systemType;
//    if(systemType == 'ios'){
//      var map = api.require('bMap');
// map.initMapSDK(function(ret) {
//     if (ret.status) {
//
//         alert('地图初始化成功，可以从百度地图服务器检索信息了！');
//     }
// });
//    }else{
//
//    }
//   var bMap = api.require('bMap');
//   bMap.getLocation({
//     accuracy: '100m',
//     autoStop: true,
//     filter: 1
//   }, function(ret, err) {
//     if (ret.status) {
//         console.log(JSON.stringify(ret.lon));
//         console.log(JSON.stringify(ret.lat));
//         bMap.open({
//             rect: {
//                 x: 0,
//                 y: 0,
//                 w: 'auto',
//                 h: 'auto'
//             },
//             center: {
//                 lon: ret.lon,
//                 lat: ret.lat
//             },
//             zoomLevel: 10,
//             showUserLocation: true,
//             fixedOn: api.frameName,
//             fixed: true
//         }, function(ret) {
//             if (ret.status) {
//             }
//         })
//     } else {
//         console.log(err.code);
//     }
// });
// }
