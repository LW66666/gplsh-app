;(function (window) {
    //数据字典
    var Static = function Static() {
        return new Static.prototype.init();
    };
    Static.prototype = {
        constructor: Static,
        DICTION: 'DICTION',
        init: function () {
            this.getAllDiction();
        },
        //获取所有的数据字典
        getAllDiction: function () {
            api.ajax({
                url: Static.IP + '/api/app/communitywanli/dictionary/listDictionaryByParentCode',
                method: 'get',
                dataType: 'json'
            }, function (ret, err) {
                if (ret) {
                    var list = ret.object;
                    if (list && list.length > 0) {
                        var storage = window.localStorage;
                        for (var i = 0; i < list.length; i++) {
                            storage.setItem(list[i].code, list[i].name);
                        }
                    }
                }
            });
        }
    };
    Static.getDictionByCode = function (code) {
        var info = window.localStorage.getItem(code);
        if (!info) {
            this.getAllDiction();
            return window.localStorage.getItem(code);
        }
        return info;
    };
    Static.prototype.init.prototype = Static.prototype;
    window.Static = Static;
})(window);


//访问地址
Static.IP = 'http://192.168.1.222:9765';
//登录过后的用户信息对象
Static.USEROBJ = 'userObj';

var user=$api.getStorage("userObj");

function relogin(ret){
    if (ret){
        if (ret.message==="请重新登录") {
            setTimeout(function () {
                api.openWin({
                    name: 'login_win',
                    url: 'widget://html/login/login_win.html'
                });
            },1000);

            $api.setStorage("phone",user.cellphone);
            $api.rmStorage("userObj")
        }
    }
}
