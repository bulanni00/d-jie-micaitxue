
/*根据QueryString参数名称获取值  *name:要获取的值的名字*/
function getQueryStringByName(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}
/*用来获取页面元素的值
            *controlID:要获取的内容的范围
            *pre：获取内容id的前部修饰符，方便选取要获取的元素。如查询是_query_ 提交_post_
            *
            */
function getFormData(controlID, pre, splitpre) {
    var data = {};

    var splitprestring = ",";
    if (splitpre == null || splitpre == undefined || splitpre == "") {
        splitprestring = ",";
    } else {
        splitprestring = splitpre;
    }
    data.splitpre = splitprestring;
    var selector = $("#" + controlID);
    selector.find("select").each(function (i, item) {
        var id = String.IsNullOrEmpty($(this).attr('id')) ? $(this).attr('name') : $(this).attr('id');
        if (id) {
            var index = id.indexOf(pre);
            if (index >= 0) {
                id = id.substr(index + pre.length, id.length - pre.length - index);
                var value = $(this).val();
                getFormData_DealValue(data, id, value, splitprestring);;
            }
        }

    });
    selector.find("input[type='checkbox']").each(function (i, item) {
        var id = String.IsNullOrEmpty($(this).attr('id')) ? $(this).attr('name') : $(this).attr('id');
        if (id) {
            var index = id.indexOf(pre);
            if (index >= 0) {
                id = id.substr(index + pre.length, id.length - pre.length - index);
                var value = $(this)[0].checked;
                getFormData_DealValue(data, id, value, splitprestring);
            }
        }

    });
    selector.find("input[type='text']").add("#" + controlID + " input[type='password']").add("#" + controlID + " input[type='hidden']").add("#" + controlID + " textarea").add("#" + controlID + " input[type='radio']:checked").each(function (i, item) {
        var id = String.IsNullOrEmpty($(this).attr('id')) ? $(this).attr('name') : $(this).attr('id');
        if (id) {
            var index = id.indexOf(pre);
            if (index >= 0) {
                id = id.substr(index + pre.length, id.length - pre.length - index);
                var value = $(this).val();
                getFormData_DealValue(data, id, value, splitprestring);
            }
        }
    });
    return data;
}
function getFormData_DealValue(data, id, value, splitpre) {
    value = encodeURI(value).replace(/'/g, "\\'"); //原来编码方式是escape,在出现德文字符时出现乱码。使用此方法测试一段时间后，再考虑是否全局替换
    var oldValue = eval("data." + id);

    var splitprestring = ",";
    if (splitpre == null || splitpre == undefined || splitpre == "") {
        splitprestring = ",";
    } else {
        splitprestring = splitpre;
    }
    if (oldValue == null || oldValue == undefined) {
        oldValue = value;
    }
    else {

        oldValue += (splitprestring + value);
    }
    eval("data." + id + "='" + oldValue + "'");
}

//去掉a的虚线框
$("a").bind("focus", function () {
    if (this.blur) { this.blur() };
});
//导航栏菜单
function dropMenu(obj) {
    $(obj).each(function () {
        var theSpan = $(this);
        var theMenu = theSpan.find(".submenu");
        var tarHeight = theMenu.height();
        theMenu.css({ height: 0, opacity: 0 });
        theSpan.hover(
            function () {
                $(this).addClass("selected");
                theMenu.stop().show().animate({ height: tarHeight, opacity: 1 }, 300);
            },
            function () {
                $(this).removeClass("selected");
                theMenu.stop().animate({ height: 0, opacity: 0 }, 300, function () {
                    $(this).css({ display: "none" });
                });
            }
        );
    });
}
/*在线qq客服*/
function QQService() {
   
    window.location.href = "http://wpa.qq.com/msgrd?v=3&amp;uin=455743297&amp;site=qq&amp;menu=yes";
}
/*获得元素*/
function $i(el) {
    if (typeof el == 'string') return document.getElementById(el);
    else if (typeof el == 'object') return el;
    return null;
}
/*获得元素数组*/
function $A(els) { var _els = []; if (els instanceof Array) { for (var i = 0; i != els.length; i++) { _els[_els.length] = $i(els[i]); } } else if (typeof els == 'object' && typeof els['length'] != 'undefined' && els['length'] > 0) { for (var i = 0; i != els.length; i++) { _els[_els.length] = $i(els[i]); } } else { _els[0] = $i(els); } return _els; }

// 显示当前日期
function setCurrentDateTime(o) {
    var d = new Date();
    var da = d.getDate();
    var mo = d.getMonth() + 1;
    var y = d.getFullYear();
    var h = d.getHours();
    if (h < 10) { h = '0' + h }
    var m = d.getMinutes();
    if (m < 10) { m = '0' + m }
    var s = d.getSeconds();
    if (s < 10) { s = '0' + s }
    var week = ['天', '一', '二', '三', '四', '五', '六'];
    $(o).html(y + '年' + mo + '月' + da + '日 星期' + week[d.getDay()] + ' ' + h + ':' + m + ':' + s);
    window.setTimeout(function () { setCurrentDateTime(o) }, 1000);
   
}



//输入文本框防止SQL注入
function AntiSqlValid(oField) {
    re = /and|or|select|update|delete|truncate|join|union|exec|insert|drop|count|'|"|=|;|>|</i;
    if (re.test(oField)) {
        return false;
    }
    return true;
}

//过滤非法字符
function doFilterMethod(s) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}
//过滤一些敏感字符函数
function filterSqlStr(value) {
    var sqlStr = sql_str().split(',');
    var flag = false;

    for (var i = 0; i < sqlStr.length; i++) {

        if (value.toLowerCase().indexOf(sqlStr[i]) != -1) {
            flag = true;
            break;

        }
    }
    return flag;
}

//敏感字符  
function sql_str() {
    var str = "and,delete,or,exec,insert,select,union,update,count,*,',join,>,<";
    return str;
}


//打开新窗口，一切事件都调用该方法
function openNewWindow(url) {
    var a = $("<a href='" + url + "' target='_blank'>下载</a>").get(0);
    var e = document.createEvent('MouseEvents');
    e.initEvent('click', true, true);
    a.dispatchEvent(e);
}