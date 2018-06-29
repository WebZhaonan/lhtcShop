!function () {
var $target = $('#J_Address');

$target.citySelect();

$target.on('click', function (event) {
    event.stopPropagation();
    $target.citySelect('open');
});

$target.on('done.ydui.cityselect', function (ret) {
    $(this).val(ret.provance + ' ' + ret.city + ' ' + ret.area);
});
}();
// 行业分类
function fnHyfl(){
var userInfo = $api.getStorage('userInfo');

api.ajax({
    url: 'http://lhtcshop.com/public/index/Index/industry',
    method: 'post',
    data: {
        values: {
            uid: userInfo.id
        },
    }
},function(ret, err){
    if (ret.code=='success') {
      var dataInter = ret.data
      var interText = doT.template($api.text($api.byId('template')));
      $api.html($api.byId('set'), interText(dataInter));
    } else {
    }
});
}
// 上传营业执照
 function fnUpdateImage(){
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
                  fnUploadAtavar(ret.data);
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
 function fnUploadAtavar(avatarUrl_) {
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
           $api.css($api.byId('dis'), 'display:inline-block');
           $api.attr($api.byId('ald'), 'src',ret.Msg);
         } else {
             api.toast({
                 msg: ret.msg,
                 duration: 2000,
                 location: 'bottom'
             });
         }
     });
 }
// 点击确认
function fnMerEnter() {
  var nameValue = $api.val($api.byId('name'));
  var options=$("#select option:selected");
  var hidValue=options.text();
  var addressValue = $api.val($api.byId('J_Address'));
  var UnameValue = $api.val($api.byId('username'));
  var phoneValue = $api.val($api.byId('phone'));
  var mailValue = $api.val($api.byId('mail'));
  var licese = $api.attr($api.byId('ald'),'src');
  var dialog = YDUI.dialog;
  var pattern = /^1[3458][0-9]{9}$/; //手机号正则验证
  var pattern1 = /^[\u4E00-\u9FA5]{1,4}$/; //中文姓名验证正则
  var isEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/; //邮箱
  if(!nameValue){
    dialog.toast('名称不能为空！', 'none', 1000);
      return;
      }
    if(hidValue=='请选择'){
      dialog.toast('请选择所属行业！', 'none', 1000);
        return;
    }
    if(!addressValue){
      dialog.toast('请选择地址！', 'none', 1000);
        return;
    }
      if(!pattern1.test(UnameValue)){
      dialog.toast('请填写正确的姓名！', 'error', 1000);
        return;
    }
    if(!pattern.test(phoneValue)){
      dialog.toast('号码格式不正确或者位数不正确！', 'error', 1000);
      return;
    }
    if(mailValue){
      if(!isEmail.test(mailValue)){
        dialog.toast('邮箱格式不正确！', 'error', 1000);
        return;
      }
    }
    if(!licese){
      dialog.toast('请上传营业执照！', 'none', 1000);
      return;
    }
    api.ajax({
        url: 'http://lhtcshop.com/public/index/Index/put_business',
        method: 'post',
        data: {
            values: {
                name: nameValue,
                 h_name: hidValue,
             address: addressValue,
            username: UnameValue,
               phone: phoneValue,
                mail: mailValue,
             license_image: licese
            },
        }
    },function(ret, err){
        if (ret.code=='success') {
           api.toast({
               msg: ret.Msg,
               duration: 2000,
               location: 'bottom'
           });
          //  api.closeWin({
          //      name: 'MerchantEntry_win'
          //  });

        } else {
        }
    });
}
// 企业上传
function fnAddfile() {
  var enterprise_name = $api.val($api.byId('enterprise_name'));
  var options=$("#select option:selected");
  var hidValue=options.text();
  var addressValue = $api.val($api.byId('J_Address'));
  var zhuce_num = $api.val($api.byId('zhuce_num'));
  var phoneValue = $api.val($api.byId('phone'));
  var nameIdValue = $api.val($api.byId('name_id'));
  var nameValue = $api.val($api.byId('name'));
  var licese = $api.attr($api.byId('ald'),'src');
  var dialog = YDUI.dialog;
  var pattern = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/; //手机号以及座机正则验证
  var pattern1 = /^[\u4E00-\u9FA5]{1,4}$/; //中文姓名验证正则
  var isName_id = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/ //身份证号验证正则
  if(!enterprise_name){
    dialog.toast('请填写企业名称！', 'none', 1000);
    return;
    }
      if(!zhuce_num){
        dialog.toast('请填写企业注册号！', 'none', 1000);
        return;
    }
    if(!addressValue){
      dialog.toast('请选择企业地址！', 'none', 1000);
      return;
    }
    if(!pattern1.test(nameValue)){
    dialog.toast('请填写正确的法人姓名！', 'error', 1000);
      return;
  }
  if(!isName_id.test(nameIdValue)){
    dialog.toast('身份证号码格式不正确或者位数不正确！', 'error', 1000);
    return;
    }
    if(hidValue=='请选择'){
      dialog.toast('请选择所属行业！', 'none', 1000);
        return;
    }
    if(!pattern.test(phoneValue)){
      dialog.toast('号码格式不正确或者位数不正确！', 'error', 1000);
      return;
    }
    if(!licese){
      dialog.toast('请上传营业执照！', 'none', 1000);
      return;
    }
    api.ajax({
        url: 'http://lhtcshop.com/public/index/Index/put_enterprise',
        method: 'post',
        data: {
            values: {
                enterprise_name : enterprise_name,
                zhuce_num : zhuce_num,
                address : addressValue,
                h_name : hidValue,
                license_image : licese,
                phone : phoneValue,
                name_sid : nameIdValue,
                name : nameValue


            },
        }
    },function(ret, err){
      console.log(ret.stayus)
        if (ret.code == 'success') {
          api.toast({
              msg: ret.Msg,
              duration: 2000,
              location: 'bottom'
          });
        } else {
            console.log( JSON.stringify( err ) );
        }
    });


}
