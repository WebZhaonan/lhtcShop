// 打开时间
function fnopenData() {
  api.openPicker({
type: 'date',
date: '1990-05-01 12:30',
title: '选择时间'
}, function(ret, err) {
if (ret) {
    var userData = $api.byId('Data');
    $api.val(userData,ret.year + '年' + ret.month + '月' + ret.day + '日');
} else {

}
});
}
function fnopenactionSheet() {
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
  $api.html(xl,bHtml);
  $api.css(xl,'color:#2d2d2d;');
}
});
}
function fnopenactionSheetJob() {
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
  $api.html(Job,bHtml);
  $api.css(Job,'color:#2d2d2d;');
}
});
}
function fnopenactionSheetMon() {
  // 打开工作薪资选择
  var Button = ['2000-4000', '3000-5000', '5000-8000','8000-12000','面议'];
  api.actionSheet({
  title: '请选择薪资',
  cancelTitle: '取消',
  buttons: Button
  }, function(ret, err) {
  var index = ret.buttonIndex;
  if(index != 6){
  var Job = $api.byId('Mon')
  var bHtml = Button[index-1]
  $api.html(Mon,bHtml);
  $api.css(Mon,'color:#2d2d2d;');
}
});
}
 var jsfun  = function load() {
  window.location.reload()
}
// 表单判断
function fnSet() {
  var UnameValue = $api.val($api.byId('Uname'));
  var UsexValue = $api.val($api.dom("input[name='sex']:checked"))
  var UphoneValue = $api.val($api.byId('phone'));
  var UcodeValue = $api.val($api.byId('code'));
  var UeduaskValue = $api.val($api.byId('eduask'));
  var UworkValue = $api.val($api.byId('work'));
  var DataValue = $api.val($api.byId('Data'));
  var XlValue = $api.html($api.byId('xl'));
  var JobValue = $api.html($api.byId('Job'));
  var MonValue = $api.html($api.byId('Mon'));
  var pattern = /^[\u4E00-\u9FA5]{1,4}$/; //中文姓名验证正则
  var pattern1 = /^1[3458][0-9]{9}$/; //手机号正则验证
  if(!UnameValue){
    layer.tips('姓名不能为空', '#Uname', {
    tips: 3
      });
      return;
      }else if(!pattern.test(UnameValue)){
        layer.tips('请填写正确的姓名', '#Uname', {
        tips: 3
      });
      return;
      }
      if(!UsexValue){
        layer.tips('请选择性别', '.sex', {
        tips: 3
          });
          return;
      }
      if(!UphoneValue){
        layer.tips('手机号不能为空', '#phone', {
        tips: 3
        });
        return;
        }else if(!pattern1.test(UphoneValue)){
          layer.tips('手机格式不正确', '#phone', {
          tips: 3
          });
          return;
        }
        if(!UeduaskValue){
          layer.tips('请填写教育背景', '#eduask', {
          tips: 3
            });
            return;
        }
        if(!UworkValue){
          layer.tips('请填写工作经历', '#work', {
          tips: 3
            });
            return;
        }
        if(!DataValue){
          layer.tips('请选择出生日期', '#Data', {
          tips: 3
            });
            return;
        }
        var userInfo = $api.getStorage('userInfo');
        api.ajax({
            url: 'http://lhtcshop.com/public/index/Ajax/release_resume',
            method: 'post',
            data: {
                values: {
                    uid : userInfo.id,
                    name: UnameValue,
                    sex:  UsexValue,
                    phone:UphoneValue,
                    eduask:UeduaskValue,
                    xueli:XlValue,
                    work:UworkValue,
                    birth:DataValue,
                    work_year:JobValue,
                    money:MonValue,

                },
            }
        },function(ret, err){
            if (ret.code =='success') {
               api.alert({
                   title: '提示',
                   msg: ret.Msg + ','+'请前往个人中心查看',
               }, function(){
                    if( ret ){
                     api.execScript({
                           name: 'MyResume_frm',//你要刷新winName
                           script: jsfun
                       });
                     api.closeWin({
                         name: 'Resume_win'
                     });
                   }
               });
            }else if(ret.code==-1){
              api.toast({
                  msg: ret.Msg,
                  duration: 2000,
                  location: 'middle'
              });
            }else {
                api.toast({
                    msg: ret.Msg,
                    duration: 2000,
                    location: 'middle'
                });
            }
        });
  }
