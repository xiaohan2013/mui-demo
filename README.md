ECHO ���ڴ�״̬��

<!DOCTYPE HTML>
<head>
<meta charset="UTF-8">
<meta name="author" content="Tencent-TGideas">
<meta name="format-detection" content="telephone=no" />
<meta name="viewport" content="user-scalable=no"/>
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta name="Copyright" content="Copyright (c) 2006-2015 TENCENT" />
<meta name="Description" content="UP2015-��Ѷ����������ȷ�����,����֮�£�����֮��" />
<meta name="Keywords" content="����֮��,����֮��,UP2015,��Ѷ����������ȷ�����,��Ѷ��Ϸ,��ȷ�����,��Ѷ��Ϸ��Ʒ������" />
<title>����֮�£�����֮��</title>
<!-- ��ƣ�yvonnefan | �ع���jasminjiang | ������timmyzhu/lennylin/avaqiu | ����ʱ�䣺2015��3��19�� | �ŶӲ��ͣ�http://tgideas.qq.com -->
<style>
/* reset */
*{margin:0;padding:0;} body,canvas,div{ -moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;-khtml-user-select: none;-webkit-tap-highlight-color:rgba(0,0,0,0);font-family:Tahoma;}
html,body {width: 100%; height: 100%; overflow: hidden;position: relative; background:#e2e2e2;}
/*loading*/
#content,#loading{width: 100%; height: 100%;}
#loading{position: absolute; top:0;left: 0;}
.loadhid{display: none}
.loading-tx{width: 40%; margin: 0 auto; padding-top: 10%; text-align: center;}
.load-area{ width: 30%; height: 46%;margin: 0 auto;position: relative;}
.la{display: block; width: 100%; height:2px;border-bottom:2px solid #474641; position: absolute; bottom: 1%; left: 0;}
.a1{-webkit-transform: rotate(-60deg);-webkit-transform-origin:0 100%;}
.a2{-webkit-transform: rotate(60deg);-webkit-transform-origin:100% 0;}
#LoadNUM{ position: absolute; bottom: 8%; left:0;display: block;width: 100%; text-align: center;font-size: 2.7rem}
.lights{position: absolute; bottom: 0; left: 0; width: 2rem; height: 2rem; border-radius: 50px; background-color: #e2e2e2; opacity: 0.8;-webkit-animation:lights 2s linear infinite;}
@-webkit-keyframes lights{
    0% {left: 44%; bottom: 32%}
    33%{left: 94%; bottom: -1%}
    66%{left: -6%; bottom: -1%}
    100%{left: 44%; bottom: 31%}
}
/*loading*/
canvas{background-color:#e2e2e2}
</style>
</head>

<body onload="init()">
<div id="loading">
    <div class="load-area">
        <i class="la a1"></i>
        <i class="la a2"></i>
        <i class="la a3"></i>
        <span id="LoadNUM">1%</span>
        <i class="lights"></i>
    </div> 
    <div class="loading-tx"><img width="100%" src="images/loadings.png"></div>
</div>
<div id="content">
    <canvas id="canvas" width="640" height="960"></canvas>
</div>
<script src="libs/preloadjs-0.6.0.min.js"></script>
<script src="src/LoaderManager.js"></script>
<script src="src/config.js"></script>
<script src="http://ossweb-img.qq.com/images/js/comm/stayTime.min.js.js"></script>
<script src="http://pingjs.qq.com/ping_tcss_ied.js"></script>
<script language="javascript">
var PP ;
var gts = function(o){return document.getElementById(o);};
var init = function(){
    gameCore.Config.core = ["libs/easeljs-0.8.0.min.js","libs/soundjs-0.6.0.min.js",
        "libs/tweenjs-0.6.0.min.js","libs/movieclip-0.8.0.min.js","src/StageManager.js"];
    gameCore.Config.loading = [{src:"src/loader.js",lib:"loaderLib",image:"loaderImages"}];
    gameCore.Config.contentLib = [{src:"src/game.js",lib:"SceneLib",image:"SceneImages"}]
    gameCore.Config.stageSize = {width:640,height:960};
    gameCore.Config.stageType = "V";
    gameCore.Config.canvas = "canvas"
    gameCore.Config.start();
};
//Ԥ����
var isANDROID  = (/Android/i.test(navigator.userAgent));
if (isANDROID){gts('LoadNUM').style.fontSize='2rem'}
var setLoad = 0;
var pti = setInterval(onProgress,300,setLoad)
function onProgress(value){
    if (value <= .49){
        if (setLoad < 50){
            setLoad++;
        }
        value= setLoad/100
    }else{
        if (pti != -1) {
            clearInterval(pti)
            pti = -1
        }
    }
    gts('LoadNUM').innerHTML=parseInt(value*100)+'%';
    if(value==1){
         if (pti !=-1){
            clearInterval(pti)
            pti = -1
        }
        gts('loading').className="loadhid";
        pgvSendClick({hottag:'imagination.loading.after'});

    }
}
// ��ת
function onBottonClick(){
//��������ǵİ�ť�¼�
window.location.href="http://up.qq.com/2015/m/up/index.shtml?ADTAG=m.index.imagination";
}
function onButtonClickEvent (type)
{
    pgvSendClick({hottag:'imagination.pages.p'+type});
}
//����
var onBridgecallback = function(){
    pgvSendClick({hottag:'imagination.relay.btn'});
},
onBridgeReady = function () {
    //ת������Ȧ SharePoint
    WeixinJSBridge.on("menu:share:timeline", function(e) {
        WeixinJSBridge.invoke("shareTimeline", {
            img_url: "http://up.qq.com/2015/imagination/images/sharelogo3.jpg",
            img_width: "120",
            img_height: "120",
            link: 'http://up.qq.com/2015/imagination/',
            desc:'�����������ܴ����ǵִ�����õĵط���',
            title:'����֮�£�����֮��'
        }, function(res) {(callback)(res);});
        pgvSendClick({hottag:'imagination.relay.quan'});
    });
    //���������
    WeixinJSBridge.on('menu:share:appmessage', function(argv) {
        WeixinJSBridge.invoke("sendAppMessage", {
            img_url: "http://up.qq.com/2015/imagination/images/sharelogo3.jpg",
            img_width: "120",
            img_height: "120",
            link: 'http://up.qq.com/2015/imagination/',
            desc: '�����������ܴ����ǵִ�����õĵط���',
            title: '����֮�£�����֮��'
        }, function(res) {(callback)(res);});
        pgvSendClick({hottag:'imagination.relay.friend'});
    });
};
try{document.addEventListener('WeixinJSBridgeReady', function() {
    onBridgeReady();
});}catch(e){};
//�����
if (typeof (pgvMain) == 'function') pgvMain();
var myStay = stayTime({
    page : document,
    time : 300,
    flag : 'imagination.staytime.tab1',
    start : true
});
</script>
</body>
</html>