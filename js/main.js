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
                tap: true, //Ĭ��Ϊtrue
                doubletap: true, //Ĭ��Ϊfalse
                longtap: true, //Ĭ��Ϊfalse
                swipe: true, //Ĭ��Ϊtrue
                drag: true, //Ĭ��Ϊtrue
                hold:false,//Ĭ��Ϊfalse��������
                release:false//Ĭ��Ϊfalse��������
            },
            swipeBack: false,
        });
        M('.mui-scroll-wrapper').scroll();

        // �໬�˵��л���ҵ
        //�໬�������ڵ�
        var offCanvasWrapper = mui('#my-expense-wrapper');
        //����������
        var offCanvasInner = offCanvasWrapper[0].querySelector('.mui-page-content');
        //�˵�����
        var offCanvasSide = document.getElementById("offCanvasSide");
        //�໬������class�б�����.mui-slide-in����ʵ�ֲ˵��ƶ��������治����Ч����
        var classList = offCanvasWrapper[0].classList;
        //�任�໬�����ƶ�Ч����
        offCanvasSide.classList.remove('mui-transitioning');
        offCanvasSide.setAttribute('style', '');
        classList.remove('mui-slide-in');
        classList.remove('mui-scalable');
        classList.add('mui-slide-in');
        M('#offCanvasSideScroll').scroll();

        //��ʼ����������
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


// ҳ���ڲ����л�
(function($,Z){
    var viewApi = $('#my-expense').view({
        defaultPage: '#main-panel'
    });
    var view = viewApi.view;

    //����view�ĺ�����webview����
    var oldBack = $.back;
    $.back = function() {
        if (viewApi.canBack()) { //���view���Ժ��ˣ���ִ��view�ĺ���
            viewApi.back();
        } else { //ִ��webview����
            oldBack();
        }
    };
    //����ҳ���л��¼�����1,ͨ��viewԪ�ؼ�������ҳ���л��¼���Ŀǰ�ṩpageBeforeShow|pageShow|pageBeforeBack|pageBack�����¼�(before�¼�Ϊ������ʼǰ����)
    //��һ������Ϊ�¼����ƣ��ڶ�������Ϊ�¼��ص�������e.detail.pageΪ��ǰҳ���html����

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
                pname:"�ͷѣ��ѹرգ�",
                amount:300,
                invoice:"��Ʊ",
                count:"12",
                project:"�й���ɬ"
            },{
                pid:"201512-2310",
                pname:"������",
                amount:100,
                invoice:"�Ƿ�Ʊ",
                count:"12",
                project:"��������"
            },{
                pid:"201511-210",
                pname:"����ѣ��ѹرգ�",
                amount:12300,
                invoice:"��Ʊ",
                count:"2",
                project:"��ʷ���"
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

// ���һ�����ݣ����д���
$(".mui-table-view-cell").on("tap", function (ev) {
    ev.preventDefault();
    var currTarget = $(this);
    var pid = currTarget.data("pid");
    $('#loadingToast').show();
});

//�л�Tabȥ������Ӧ������
$(".mui-control-item").on("tap", function (ev) {
    var currPanel = ev.detail;
    var $activePanalID = $(this).attr("href");
    var activePanel = $($activePanalID);

    common.panelNetworkHandler($activePanalID.substr(1));
})

//�л���offCanvasʱ�������ѡ����ҵ�б�
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

