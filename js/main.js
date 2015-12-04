/**
 * Created by schp-tany on 2015/12/4.
 */
window.common = {
    panelNetworkHandler:function(panelId){
        var request = function(settings,successHandler){
            $('#loadingToast').show();
            mui.ajax(mui.extend(true,settings,{
                success: function (result) {
                    $('#loadingToast').hide();
                    successHandler(result);
                }
            }));
        }
        var panelId = panelId || "wait-commit";
        switch(panelId){
            case "wait-commit":
                request({
                    url:"data/f1.json",
                    dataType:"json",
                }, function (result) {
                    console.log("wait-commit");
                });
                break;
            case "in-approval":
                request({
                    url:"data/f1.json",
                    dataType:"json",
                }, function (result) {
                    console.log("in-approval");
                });
                break;
            case "in-pass":
                request({
                    url:"data/f1.json",
                    dataType:"json",
                }, function (result) {
                    console.log("in-pass");
                });
                break;
            case "in-confirm":
                request({
                    url:"data/f1.json",
                    dataType:"json",
                }, function (result) {
                    console.log("in-confirm");
                });
                break;
            case "all":
                request({
                    url:"data/f1.json",
                    dataType:"json",
                }, function (result) {
                    console.log("all");
                });
                break;
        };
    }
};
(function(M, doc, Z) {
        M.init({
            gestureConfig:{
                tap: true, //默认为true
                doubletap: true, //默认为false
                longtap: true, //默认为false
                swipe: true, //默认为true
                drag: true, //默认为true
                hold:false,//默认为false，不监听
                release:false//默认为false，不监听
            },
            swipeBack: false,
        });
        M('.mui-scroll-wrapper').scroll();

        // 侧滑菜单切换企业
        //侧滑容器父节点
        var offCanvasWrapper = mui('#my-expense-wrapper');
        //主界面容器
        var offCanvasInner = offCanvasWrapper[0].querySelector('.mui-page-content');
        //菜单容器
        var offCanvasSide = document.getElementById("offCanvasSide");
        //侧滑容器的class列表，增加.mui-slide-in即可实现菜单移动、主界面不动的效果；
        var classList = offCanvasWrapper[0].classList;
        //变换侧滑动画移动效果；
        offCanvasSide.classList.remove('mui-transitioning');
        offCanvasSide.setAttribute('style', '');
        classList.remove('mui-slide-in');
        classList.remove('mui-scalable');
        classList.add('mui-slide-in');
        M('#offCanvasSideScroll').scroll();

        //初始化加载数据
        common.panelNetworkHandler();

        M.ajax({
            type:"GET",
            url:'data/company.json',
            dataType:"json",
            success: function (result) {
                if(result.code == 0){
                    var companyList = template("Tpl_companyItem",{data:result.data});
                    Z("#companies-list").html(companyList);
                }
            }
        });

})(mui, document, Zepto);


// 页面内部的切换
(function($,Z){
    var viewApi = $('#my-expense').view({
        defaultPage: '#main-panel'
    });
    var view = viewApi.view;

    //处理view的后退与webview后退
    var oldBack = $.back;
    $.back = function() {
        if (viewApi.canBack()) { //如果view可以后退，则执行view的后退
            viewApi.back();
        } else { //执行webview后退
            oldBack();
        }
    };
    //监听页面切换事件方案1,通过view元素监听所有页面切换事件，目前提供pageBeforeShow|pageShow|pageBeforeBack|pageBack四种事件(before事件为动画开始前触发)
    //第一个参数为事件名称，第二个参数为事件回调，其中e.detail.page为当前页面的html对象

    view.addEventListener('pageBeforeShow', function(e) {
        console.log(mui.target)
        //				console.log(e.detail.page.id + ' beforeShow');
        console.log(e.detail.page)
        var currPage = e.detail.page;
        if(currPage.id == "receipt-detail"){
            var ReceiptDetailPage = Z(currPage).find("#receipt-container")
            //console.log(template(Tpl_listItem,[]))
            Z(ReceiptDetailPage).html( template("Tpl_listItem",{data:[{
                pid:"201511-210",
                pname:"餐费（已关闭）",
                amount:300,
                invoice:"发票",
                count:"12",
                project:"中国艰涩"
            },{
                pid:"201512-2310",
                pname:"建筑费",
                amount:100,
                invoice:"非发票",
                count:"12",
                project:"北京地铁"
            },{
                pid:"201511-210",
                pname:"服务费（已关闭）",
                amount:12300,
                invoice:"发票",
                count:"2",
                project:"历史起点"
            }]}));
        }
    });
    view.addEventListener('pageShow', function(e) {
        Z('#loadingToast').hide();
        //console.log(e)
        //				console.log(e.detail.page.id + ' show');
    });
    view.addEventListener('pageBeforeBack', function(e) {
        //console.log(e)
        //				console.log(e.detail.page.id + ' beforeBack');
    });
    view.addEventListener('pageBack', function(e) {
        //console.log(e)
        //				console.log(e.detail.page.id + ' back');
    });
})(mui,Zepto);

// 点击一条数据，进行处理
$(".mui-table-view-cell").on("tap", function (ev) {
    ev.preventDefault();
    var currTarget = $(this);
    var pid = currTarget.data("pid");
    $('#loadingToast').show();
});

//切换Tab去请求相应的数据
$(".mui-control-item").on("tap", function (ev) {
    var currPanel = ev.detail;
    var $activePanalID = $(this).attr("href");
    var activePanel = $($activePanalID);

    common.panelNetworkHandler($activePanalID.substr(1));
})

//切换出offCanvas时，请求可选的企业列表
var currCompanyId;
document.querySelector('#companies-list').addEventListener('selected',function(e){
    var currSelectId = $(e.detail.el).data("cid");
    currCompanyId = currSelectId;

    //mui.ajax({
    //    url:"list?cid="+currCompanyId,
    //    type:"GET",
    //    dataType:"json",
    //    success: function (result) {
    //
    //    }
    //})
    console.log(mui("").offCanvas());
});

