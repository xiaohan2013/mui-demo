/**
 * Created by schp-tany on 2015/12/8.
 */



mui.init();
//初始化单页view
var viewApi = mui('#receipt-input').view({
    defaultPage: '#input-page'
});
var view = viewApi.view;
(function($) {
    //处理view的后退与webview后退
    var oldBack = $.back;
    $.back = function() {
        if (viewApi.canBack()) { //如果view可以后退，则执行view的后退
            viewApi.back();
        } else { //执行webview后退
            oldBack();
        }
    };
    view.addEventListener('pageBeforeShow', function(e) {
        //				console.log(e.detail.page.id + ' beforeShow');
    });
    view.addEventListener('pageShow', function(e) {
        //				console.log(e.detail.page.id + ' show');
    });
    view.addEventListener('pageBeforeBack', function(e) {
        //				console.log(e.detail.page.id + ' beforeBack');
    });
    view.addEventListener('pageBack', function(e) {
        //				console.log(e.detail.page.id + ' back');
    });
})(mui);


// 点击按钮获取拍照或者选择图片
//wx.config({
//    debug: true,
//    appId: "wx5afdba0c2bb14857",
//    timestamp: "{{ content['timestamp'] }}",
//    nonceStr: "{{ content['nonceStr'] }}",
//    signature: "{{ content['signature'] }}",
//    jsApiList: ['chooseImage', 'uploadImage', 'hideOptionMenu','closeWindow']
//});


// 加载微信库
function onWxBridgeReady(){
    console.log("微信库已经加载。。。")
    wx.hideOptionMenu();
    //成功验证 微信页面加载时，需要执行的远程调用需要在此执行
    wx.ready(function () {

    })
    //验证失败
    wx.error(function () {

    });
};
document.addEventListener("WeixinJSBridgeReady",onWxBridgeReady,false);


var btnGetImage = document.querySelector("#get-image");
btnGetImage.addEventListener("tap", function (e) {
    wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            alert(localIds)
        }
    });
})

mui('.mui-content .mui-switch').each(function() { //循环所有toggle
    //toggle.classList.contains('mui-active') 可识别该toggle的开关状态
    this.parentNode.querySelector('span').innerText = '状态：' + (this.classList.contains('mui-active') ? 'true' : 'false');
    /**
     * toggle 事件监听
     */
    this.addEventListener('toggle', function(event) {
        //event.detail.isActive 可直接获取当前状态
        this.parentNode.querySelector('span').innerText = '状态：' + (event.detail.isActive ? 'true' : 'false');
    });
});


// 日期选择器
var btns = mui('#receipt-date');
btns.each(function(i, btn) {
    btn.addEventListener('tap', function() {
        var optionsJson = this.getAttribute('data-options') || '{}';
        var options = JSON.parse(optionsJson);
        var id = this.getAttribute('id');
        /*
         * 首次显示时实例化组件
         * 示例为了简洁，将 options 放在了按钮的 dom 上
         * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
         */
        var picker = new mui.DtPicker(options);
        picker.show(function(rs) {
            /*
             * rs.value 拼合后的 value
             * rs.text 拼合后的 text
             * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
             * rs.m 月，用法同年
             * rs.d 日，用法同年
             * rs.h 时，用法同年
             * rs.i 分（minutes 的第二个字母），用法同年
             */
            //result.innerText = '选择结果: ' + rs.text;
            btns[0].innerText = rs.text;
            console.log(rs.text)
            /*
             * 返回 false 可以阻止选择框的关闭
             * return false;
             */
            /*
             * 释放组件资源，释放后将将不能再操作组件
             * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
             * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
             * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
             */
            picker.dispose();
        });
    }, false);
});

// 企业选择器
var picker  = new mui.PopPicker();
console.log(picker)
var btn_CompanySelect = document.querySelector("#select-company");
btn_CompanySelect.addEventListener('tap', function(event) {
    mui.ajax({
        type:"GET",
        dataType:"json",
        url:"data/company.json",
        success: function (res) {
            if(res.code == 0){
                console.log(picker)
                console.log(picker.pickers[0].lastIndex);
                picker.setData(res.data);
                var selectedIndex = btn_CompanySelect.getAttribute("data-index");
                selectedIndex && picker.pickers[0].setSelectedIndex(selectedIndex);
                picker.show(function(items) {
                    //var selectedItem = JSON.stringify(items[0]);
                    var selectedItem =items[0];
                    //返回 false 可以阻止选择框的关闭
                    //return false;
                    btn_CompanySelect.innerText = selectedItem.text;
                    btn_CompanySelect.setAttribute("data-index",picker.pickers[0].lastIndex||0)
                    console.log(items)
                });
            }
        }
    });

}, false);

// 类别选择器
var btn_SubjectSelect = document.querySelector("#select-subject");
btn_SubjectSelect.addEventListener('tap', function(event) {
    mui.ajax({
        type: "GET",
        dataType: "json",
        url: "data/subjects.json",
        success: function (res) {
            if (res.code == 0) {
                //console.log(res.data)
                picker.setData(res.data.rows);
                console.log(picker.pickers[0].lastIndex);
                var selectedIndex = btn_SubjectSelect.getAttribute("data-index");
                selectedIndex && picker.pickers[0].setSelectedIndex(selectedIndex);
                picker.show(function(items) {
                    var selectedItem =items[0];
                    //返回 false 可以阻止选择框的关闭
                    //return false;
                    btn_SubjectSelect.innerText = selectedItem.text;
                    btn_SubjectSelect.setAttribute("data-index",picker.pickers[0].lastIndex||0)
                    console.log(items)
                });
            }
        }
    });
})
// 项目选择器
var btn_ProjectSelect = document.querySelector("#select-project");
console.log(picker)
var projectHandler = function(event) {
    btn_ProjectSelect.removeEventListener('tap', projectHandler, false);
    mui.ajax({
        type: "GET",
        dataType: "json",
        url: "data/projects.json",
        success: function (res) {
            btn_ProjectSelect.addEventListener('tap',projectHandler,false);
            if (res.code == 0) {
                //console.log(res.data)
                console.log(picker.pickers[0].lastIndex);
                picker.setData(res.data.rows);
                var selectedIndex = btn_ProjectSelect.getAttribute("data-index");
                selectedIndex && picker.pickers[0].setSelectedIndex(selectedIndex);
                picker.show(function(items) {
                    var selectedItem =items[0];
                    //返回 false 可以阻止选择框的关闭
                    //return false;
                    btn_ProjectSelect.innerText = selectedItem.text;
                    btn_ProjectSelect.setAttribute("data-index",picker.pickers[0].lastIndex||0)
                });
            }
        }
    });
};
btn_ProjectSelect.addEventListener('tap',projectHandler,false);

// 让表单可以滚动
var scrollerInput = mui('.mui-scroll-wrapper').scroll();

//
var btn_ReceiptSave = document.querySelector("#receipt-save");
var receiptSaveHandler = function (event) {
    console.log(viewApi)
    viewApi.go("#input-result")
}
btn_ReceiptSave.addEventListener("tap",receiptSaveHandler,false);

var btn_InputMore = document.querySelector("#input-more");
btn_InputMore.addEventListener("tap", function (event) {
    scrollerInput[0].scrollTo(0,0);
    viewApi.back();
},false);





