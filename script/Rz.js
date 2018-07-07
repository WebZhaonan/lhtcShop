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
// 二手交易
// 获取物品类别
function fnWpfl(){
var userInfo = $api.getStorage('userInfo');
api.ajax({
    url: 'http://lhtcshop.com/public/index/Ajax/classification',
    method: 'post',
},function(ret, err){
    if (ret.code=='success') {
      var dataInter = ret.data
      var interText = doT.template($api.text($api.byId('template')));
      $api.html($api.byId('set'), interText(dataInter));
    } else {

    }
});
}
// 选择物品新旧
function fnselect() {
  // 打开学历选择
  var Button = ['99新', '95新', '8成新','其他'];
  api.actionSheet({
  title: '请选择',
  cancelTitle: '取消',
  buttons: Button
  }, function(ret, err) {
  var index = ret.buttonIndex;
  if(index != 5){
  var wp = $api.byId('wp')
  var bHtml = Button[index-1]
  $api.val(wp,bHtml);
  $api.css(wp,'color:#2d2d2d;');
}
});
}
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

// 发布
 function fnopenFb() {
   var UtitValue = $api.val($api.byId('Tit'));
   var options=$("#select option:selected");
   var cidValue=options.val();
   var UphoneValue = $api.val($api.byId('phone'));
   var wpValue = $api.val($api.byId('wp'));
   var o_priceValue = $api.val($api.byId('o_price'));
   var priceValue = $api.val($api.byId('price'));
   var postageValue = $api.val($api.byId('postage'));
   var describeValue = $api.val($api.byId('describe'));
   var pattern = /^1[3458][0-9]{9}$/; //手机号正则验证
   var dialog = YDUI.dialog;
   var img_urls = [];
    $(".xh").each(function() {
    img_urls.push($(this).attr("src"));
    });
   if(!UtitValue){
     dialog.toast('标题不能为空！', 'none', 1000);
       return;
      }
      if(!pattern.test(UphoneValue)){
        dialog.toast('号码格式不正确或者位数不正确！', 'error', 1000);
        return;
      }
     if(cidValue=='请选择'){
       dialog.toast('请选择物品类别！', 'none', 1000);
         return;
     }
     if(!wpValue){
       dialog.toast('物品新旧！', 'none', 1000);
         return;
     }
     if(!o_priceValue){
       dialog.toast('原价不能为空！', 'error', 1000);
       return;
     }
     if(!postageValue){
       dialog.toast('现价不能为空！', 'none', 1000);
       return;
     }
     if(!describeValue){
       dialog.toast('请对物品进行描述！', 'none', 1000);
       return;
     }
     api.ajax({
         url: 'http://lhtcshop.com/public/index/Ajax/release_second',
         method: 'post',
         data: {
             values: {
                 title: UtitValue,
                 phone: UphoneValue,
                   cid: cidValue,
             condition: wpValue,
               o_price: o_priceValue,
                 price: priceValue,
               postage: postageValue,
              describe: describeValue,
               images: img_urls
             }
         }
     },function(ret, err){
         if (ret.code=='success') {
             api.alert({
                 title: '提示',
                 msg: ret.Msg + '请在个人中心，我的发布中查看',
             }, function(res){
                 if( ret ){
                    window.location.reload();
                    api.openWin({
                        name: 'index',
                        url: '../../index.html',
                        pageParam: {
                            name: 'test'
                        }
                    });

                 }
             });

         } else {
         }
     });

 }
