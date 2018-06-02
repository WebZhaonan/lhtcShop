var UIInput;
var usernameUIInputId;
var passwordUIInputId;
var codeUIInputId;
var usernameValue;
var passwordValue;
var codeValue
function fnInitUIInput() {
    // 注册手机号输入框模块
    var username = $api.byId('mobile');
    var usernameRect = $api.offset(username);
    UIInput = api.require('UIInput');
    UIInput.open({
        rect: {
            x: usernameRect.l ,
            y: usernameRect.t,
            w: usernameRect.w-120,
            h: usernameRect.h
        },
        styles: {
            // bgColor: '#fff',
            size: 16,
            color: '#000',
            placeholder: {
                color: '#ccc'
            },
        },
        autoFocus: false,
        maxRows: 1,
        placeholder: '手机号',
        keyboardType: 'number',
        fixedOn: api.frameName
    }, function(ret, err) {
        if (ret) {
             usernameUIInputId = ret.id;
            if (ret && ret.eventType == "show") {
                setTimeout(function() {
                    UIInput.popupKeyboard({
                        id:  usernameUIInputId
                    });
                }, 200);
            } else if (ret.eventType == "change") {
                UIInput.value({
                    id:  usernameUIInputId
                }, function(ret, err) {
                    if (ret) {
                        if (ret.status) {
                             usernameValue = ret.msg;
                        }
                    }
                });
            }
        }
    });
     // 验证码输入框
     var code = $api.byId('code');
     var codeRect = $api.offset(code);
     UIInput.open({
         rect: {
             x: codeRect.l,
             y: codeRect.t,
             w: codeRect.w,
             h: codeRect.h
         },
         styles: {
             bgColor: '#fff',
             size: 16,
             color: '#000',
             placeholder: {
                 color: '#ccc'
             }
         },
         autoFocus: false,
         maxRows: 1,
         placeholder: '验证码',
         keyboardType: 'number',
         fixedOn: api.frameName
     }, function(ret, err) {
         if (ret) {
             codeUIInputId = ret.id;
             if (ret.eventType == "change") {
                 UIInput.value({
                     id: codeUIInputId
                 }, function(ret, err) {
                     if (ret) {
                         if (ret.status) {
                             codeValue = ret.msg;
                         }
                     }
                 });
             }
         }
     });

    // 密码输入框模块
    var password = $api.byId('password');
    var passwordRect = $api.offset(password);
    UIInput.open({
        rect: {
            x: passwordRect.l,
            y: passwordRect.t,
            w: passwordRect.w,
            h: passwordRect.h
        },
        styles: {
            bgColor: '#fff',
            size: 16,
            color: '#000',
            placeholder: {
                color: '#ccc'
            }
        },
        autoFocus: false,
        maxRows: 1,
        placeholder: '密码',
        keyboardType: 'default',
        inputType: 'password',
        fixedOn: api.frameName
    }, function(ret, err) {
        if (ret) {
            passwordUIInputId = ret.id;
            if (ret.eventType == "change") {
                UIInput.value({
                    id: passwordUIInputId
                }, function(ret, err) {
                    if (ret) {
                        if (ret.status) {
                            passwordValue = ret.msg;
                        }
                    }
                });
            }
        }
    });
}
