// 上传物品照片
 function fnUpdateImage1(){
   api.actionSheet({
       title: '选择',
       cancelTitle: '取消',
       buttons: ['拍照', '相册']
   }, function(ret, err) {
       if (ret) {
           var sourceTypes = [
               'camera',
               'album'
           ];
           var encodingType = [
               'jpg',
               'png'
           ];
           if (ret.buttonIndex == (sourceTypes.length + 1)) {
               return;
           }
           api.getPicture({
               sourceType: sourceTypes[ret.buttonIndex - 1],
               encodingType:encodingType,
               destinationType:'url',
               mediaValue:'pic',
               allowEdit: true,
               quality: 50, // 指定图片质量
           }, function(ret, err) {
               if (ret) {
                  fnUploadAtavar1(ret.data);
               }else {
                 {
                   //  alert(JSON.stringify());
                 }
               }
           });
       }
   });
 }
 // 上传图片文件
 function fnUploadAtavar1(avatarUrl_) {
     var userInfo = $api.getStorage('userInfo');
     api.ajax({
         url: 'http://lhtcshop.com/public/index/Index/user_image',
         method: 'post',
         headers: {
             "X-APICloud-AppId": "A6079750662654",
             "X-APICloud-AppKey": "4B3AB3D8-C633-6D3E-F6C3-37EDFE6978AB"
         },
         data: {
           values: {
               filename: 'icon'
           },
             files: {
                 file: avatarUrl_
             }
         }
     }, function(ret, err) {
         if (ret.code=='success') {
           var Images = ret;
           var interText = doT.template($api.text($api.byId('template1')));
           $api.prepend($api.byId('append'), interText(Images));
         } else {
             api.toast({
                 msg: ret.msg,
                 duration: 2000,
                 location: 'bottom'
             });
         }
     });
 }
 function fnopensheelt() {
   // 打开身份选择
   var Button = ['业主', '个人', '中介'];
   api.actionSheet({
   title: '请选择身份',
   cancelTitle: '取消',
   buttons: Button
   }, function(ret, err) {
   var index = ret.buttonIndex;
   if(index != 4){
   var xl = $api.byId('xl')
   var bHtml = Button[index-1]
   $api.val(xl,bHtml);
   $api.css(xl,'color:#2d2d2d;');
 }
 });
 }
 function fnopensheelt1() {
   // 打开放行选择
   var Button = ['整租', '合租','其他'];
   api.actionSheet({
   title: '请选择身份',
   cancelTitle: '取消',
   buttons: Button
   }, function(ret, err) {
   var index = ret.buttonIndex;
   if(index != 4){
   var fx = $api.byId('Fx')
   var bHtml = Button[index-1]
   $api.val(fx,bHtml);
   $api.css(fx,'color:#2d2d2d;');
 }
 });
 }
 function fnopensheelt2() {
   // 打开装修程度
   var Button = ['毛坯', '简装','中等装修','精装'];
   api.actionSheet({
   title: '请选择身份',
   cancelTitle: '取消',
   buttons: Button
   }, function(ret, err) {
   var index = ret.buttonIndex;
   if(index != 5){
   var Zx = $api.byId('Zx')
   var bHtml = Button[index-1]
   $api.val(Zx,bHtml);
   $api.css(Zx,'color:#2d2d2d;');
 }
 });
 }
 // 房屋优点添加点击事件
 $(".aui-col-xs-3").click(function(){
   var addCls= $(this);
   addCls.children('.aui-btn').toggleClass('active')
 });
var data_json = {};
var toast = new auiToast();
 function fnCzfb() {
    $("input").each(function() {
        var nameV=$(this).attr('name')
        var val = $(this).val()
        data_json[nameV] = val;
    });
  var userInfo= $api.getStorage('userInfo');
  data_json['uid'] = userInfo.id;
    var ac_json = []
    $('.active').each(function() {
      var name1=$(this).text();
      ac_json.push(name1);
  })
  data_json['config'] = ac_json;
  var detail = $api.val($api.byId('detail'));
  data_json['detail'] = detail;
  var img_urls = [];
  $(".xh").each(function() {
  img_urls.push($(this).attr("src"));
  });
  data_json['images'] = img_urls;
  var pattern = /^[\u4E00-\u9FA5]{1,4}$/; //中文姓名验证正则
  var pattern1 = /^1[3458][0-9]{9}$/; //手机号正则验证
  if(!pattern.test($api.val($api.byId('name')))){
    api.toast({
        msg: '姓名格式不正确或者位数不正确',
        duration: 2000,
        location: 'middle'
    });
    return;
  }
  if(!pattern1.test($api.val($api.byId('phone')))){
    api.toast({
        msg: '号码格式不正确或者位数不正确！',
        duration: 2000,
        location: 'middle'
    });
    return;
  }
  if(!$api.val($api.byId('xl'))){
    api.toast({
        msg: '请选择身份！',
        duration: 2000,
        location: 'middle'
    });
    return;
  }
  if(!$api.val($api.byId('r_name'))){
    api.toast({
        msg: '请填写小区名称！',
        duration: 2000,
        location: 'middle'
    });
    return;
  }
  if(!$api.val($api.byId('Fx'))){
    api.toast({
        msg: '请选择出租类型！',
        duration: 2000,
        location: 'middle'
    });
    return;
  }
  if(!$api.val($api.byId('area'))){
    api.toast({
        msg: '请填写房屋面积！',
        duration: 2000,
        location: 'middle'
    });
    return;
  }
  if(!$api.val($api.byId('Zx'))){
    api.toast({
        msg: '请选择装修程度！',
        duration: 2000,
        location: 'middle'
    });
    return;
  }
  if(!$api.val($api.byId('info'))){
    api.toast({
        msg: '请选择位置！',
        duration: 2000,
        location: 'middle'
    });
    return;
  }
  if(!$api.val($api.byId('price'))){
    api.toast({
        msg: '请填写租金！',
        duration: 2000,
        location: 'middle'
    });
    return;
  }
  if(!$('.aui-btn').is('.active')){
    api.toast({
        msg: '房屋配置至少选择一个！',
        duration: 2000,
        location: 'middle'
    });
    return;
  }
  if(!$api.val($api.byId('detail'))){
    api.toast({
        msg: '请填写房屋描述！',
        duration: 2000,
        location: 'middle'
    });
    return;
  }
  api.ajax({
      url: 'http://lhtcshop.com/public/index/Ajax/release_lease',
      method: 'post',
      data: {
          values: data_json,
      }
  },function(ret, err){
      if (ret.code = 'success') {
        toast.loading({
              title:"提交中",
              duration:2000
          },function(res){
              setTimeout(function(){
                  toast.hide();
                  api.toast({
                      msg:ret.Msg + '请前往首页查看',
                      duration: 4000,
                      location: 'bottom'
                  });
                  window.location.reload()
              }, 3000)
          });
      } else {
          alert( JSON.stringify( err ) );
      }
  });

 }
