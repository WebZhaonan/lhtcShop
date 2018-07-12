var map,
    lat,
    lon,
    address;
    // 打开地图
    function fnBmap() {
      map = api.require('bMap');
      var Button = ['使用当前位置', '打开地图'];
      api.actionSheet({
      title: '请选择',
      cancelTitle: '取消',
      buttons: Button
      }, function(ret, err) {
      var index = ret.buttonIndex;
      if(index ==1){
      if(api.systemType == 'ios'){
        api.getLocation(function(ret, err) {
        if (ret && ret.status) {
          map.initMapSDK(function(ret,err) {
        if (ret.status) {
          map.getLocation({
              accuracy: '100m',
              autoStop: true,
              filter: 1
          }, function(ret, err){
              api.hideProgress();
              if(ret.status){
                  lat = ret.lat;
                  lon = ret.lon;
                  //设置地图中心
                  map.setCenter({
                      coords: {
                          lon: lon,
                          lat: lat
                      },
                      animation:true
                  });
                  getNameFromCoords();
                  $api.val($api.byId("ln"),lon);
                  $api.val($api.byId("la"),lat);
              }

          });
        }else {
          {
            alert(JSON.stringify(err))
          }
        }
    });
    }
      });
      }else{
        map.getLocation({
            accuracy: '100m',
            autoStop: true,
            filter: 1
        }, function(ret, err){
            api.hideProgress();
            if(ret.status){
                lat = ret.lat;
                lon = ret.lon;
                //设置地图中心
                map.setCenter({
                    coords: {
                        lon: lon,
                        lat: lat
                    },
                    animation:true
                });
                getNameFromCoords();
                $api.val($api.byId("ln"),lon);
                $api.val($api.byId("la"),lat);
            }

        });
      }
    }else if (index==2) {
      api.openWin({
          name: 'bmap_win',
          url: '../Map/bmap_win.html',
          pageParam: {
              name: 'test'
          }
      });
    }
    });
    }
      function getNameFromCoords(){
        map.getNameFromCoords({
            lon: lon,
            lat: lat
        },function(ret,err){
            if(ret.status){
                address = ret.address;
                $api.val($api.byId("info"),address);
            }else {
                console.log(JSON.stringify(err));
            }
        });
    }
    function setInfo(lon,lat,address){
        $api.val($api.byId("ln"),lon);
        $api.val($api.byId("la"),lat);
        $api.val($api.byId("info"),address);
    }
