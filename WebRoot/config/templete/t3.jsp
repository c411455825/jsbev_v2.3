<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%
System.out.println("__________________________________________________");
String theme = (String) request.getParameter("theme");
String x = (String) request.getParameter("x");
String y = (String) request.getParameter("y");
String z = (String) request.getParameter("z");
String layerType = (String) request.getParameter("layerType");
String url = (String) request.getParameter("url");
String mapCtrl = (String) request.getParameter("mapCtrl");
String bevCtrl = (String) request.getParameter("bevCtrl");
if(theme == null){
	theme = "cupertino";
}
if(x==""||x==null){
	x="0";
}
if(y==""||y==null){
	y="0";
}
if(z==""||z==null){
	z="0";
}
if(layerType==null)layerType="1";
if(mapCtrl==null)mapCtrl="";
if(bevCtrl==null)bevCtrl="1_2_3";
%>
<!DOCTYPE html> 
<html>
	<head> 
	<title>supermap</title> 
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        .measure_16_16 {
            background: url(demo/img/mesure_16_16_t3.png);
        }

        .geolocate_16_16 {
            background: url(demo/img/geolocate_16_16_t3.png);
        }

        .draw_16_16 {
            background: url(demo/img/draw_16_16_t3.png);
        }
    </style>
    <script src="demo/libs/SuperMap.Include.js"></script><!--引入SuperMap iClient For JavaScript类库-->
    <script src="common/js/jquery-1.8.2.js"></script>
    <script src="demo/js/templete3/bev_main.js"></script>                    <!--引入bev入口脚本-->
    <!--
         //初始化bev框架，
        SuperMap.Bev.Main.init(function(){
                //页面代码需要放入其回调函数中


                //设置主题，支持的主题有base，black-tie，blitzer，cupertino，dark-hive
                //dot-luv，eggplant，excite-bike，flick，hot-sneaks，humanity，le-frog，mint-choc，overcast，pepper-grinder
                //redmond，smoothness，south-street，start，sunny，swanky-purse，trontastic，ui-darkness，ui-lightness，vader
                SuperMap.Bev.Theme.set("dot-luv");

                //your code
            });
    -->
    
    <jsp:include page="initMap.jsp"> 
		<jsp:param name="theme" value="<%=theme%>"/>
		<jsp:param name="x" value="<%=x%>"/> 
		<jsp:param name="y" value="<%=y%>"/> 
		<jsp:param name="z" value="<%=z%>"/> 
		<jsp:param name="layerType" value="<%=layerType%>"/>
		<jsp:param name="url" value="<%=url%>"/>
		<jsp:param name="mapCtrl" value="<%=mapCtrl%>"/>
	</jsp:include>
	<script type="text/javascript">
		var myNavigation,myToolBar,myMeasure,myGeolocate,myDrawFeature;
        function initDemo(){
            myToolBar = new SuperMap.Bev.ToolBar($("#toolbar"),map,[
			<%if(bevCtrl.indexOf("0")<0){%>
                {
                    "icon":"demo/img/tool_t3.png",
                    "title":"基本操作",
                    "menu":new SuperMap.Bev.Menu(null,{
                        "tree":[
							<%if(bevCtrl.indexOf("1")>=0){%>
                            {
                                "icon":"measure_16_16",
                                "text":"量&nbsp;&nbsp;&nbsp;&nbsp;算",
                                "events":{
                                    "click":function () {
                                        if (!myMeasure) {//!myMeasure
                                            var dialog = new SuperMap.Bev.Dialog(null,{
                                                "icon":"measure_16_16",
                                                "text":"量&nbsp;&nbsp;&nbsp;&nbsp;算"
                                            });

                                            var contentBody = dialog.getContentBody();
                                            myMeasure = new SuperMap.Bev.Measure({
                                                "body":contentBody,
                                                "map":map,
                                                "distanceIcon":"demo/img/measure_distance_16_16_t3.png",
                                                "areaIcon":"demo/img/measureArea_16_16_t3.png"
                                            });
                                            dialog.on("dialogclose", function () {
                                                if (myMeasure) {
                                                    myMeasure.destroy();
                                                    myMeasure = null;
                                                }
                                            })
                                        }
                                    }
                                }
                            }
							<%}%>
							<%if(bevCtrl.indexOf("1")>=0&&(bevCtrl.indexOf("2")>=0||bevCtrl.indexOf("3")>=0)){%>,<%}%>
							<%if(bevCtrl.indexOf("2")>=0){%>
                            {
                                "icon":"geolocate_16_16",
                                "text":"定&nbsp;&nbsp;&nbsp;&nbsp;位",
                                "events":{
                                    "click":function () {
                                        if (!myGeolocate) {
                                            var dialog = new SuperMap.Bev.Dialog(null,{
                                                "icon":"geolocate_16_16",
                                                "text":"定&nbsp;&nbsp;&nbsp;&nbsp;位"
                                            });

                                            var contentBody = dialog.getContentBody();
                                            myGeolocate = new SuperMap.Bev.Geolocate({
                                                "body":contentBody,
                                                "map":map,
                                                "locationIcon":"demo/img/geolocate_16_16_t3.png",
                                                "clearIcon":"demo/img/clear_16_16_t3.png"
                                            });
                                            dialog.on("dialogclose", function () {
                                                if (myGeolocate) {
                                                    myGeolocate.destroy();
                                                    myGeolocate = null;
                                                }
                                            })
                                        }
                                    }
                                }
                            }
							<%}%>
							<%if(bevCtrl.indexOf("2")>=0&&bevCtrl.indexOf("3")>=0){%>,<%}%>
							<%if(bevCtrl.indexOf("3")>=0){%>
                            {
                                "icon":"draw_16_16",
                                "text":"绘&nbsp;&nbsp;&nbsp;&nbsp;制",
                                "events":{
                                    "click":function () {
                                        if (!myDrawFeature) {
                                            var dialog = new SuperMap.Bev.Dialog(null, {
                                                "icon":"draw_16_16",
                                                "text":"绘&nbsp;&nbsp;&nbsp;&nbsp;制"
                                            });

                                            var contentBody = dialog.getContentBody();
                                            myDrawFeature = new SuperMap.Bev.DrawFeature({
                                                "body":contentBody,
                                                "map":map,
                                                "pointIcon":"demo/img/drawpoint_16_16_t3.png",
                                                "lineIcon":"demo/img/drawline_16_16_t3.png",
                                                "areaIcon":"demo/img/drawarea_16_16_t3.png",
                                                "clearIcon":"demo/img/clear_16_16_t3.png"
                                            });
                                            dialog.on("dialogclose", function () {
                                                if (myDrawFeature) {
                                                    myDrawFeature.destroy();
                                                    myDrawFeature = null;
                                                }
                                            })
                                        }
                                    }
                                }
                            }
							<%}%>
                        ]
                    })
                }
				<%}%>
            ]);
            
            window.setTimeout(function(){
				myToolBar.setMap(map);
			},30);
        }
    </script>
</head>
<body onload="init()" style="position: absolute;height: 100%;width: 100%;">
    <div id="head"></div>
    <div id="canvas">
        <div id="mapContainer"></div>
        <span id="toolbar"></span>
    </div>
</body>
<script type="text/javascript">
    (function(){//控制页面的自适应
        window.resizeFunctions = [];
        var a = function(){
            var b = document.body;
            var a = b.clientHeight;
            var w = b.clientWidth;
            var c = window.resizeFunctions;
            for(var i=0;i< c.length;c++){
                if(c[i]){
                    try{c[i]();}catch(e){}
                }
            }
            var d = document.getElementById("canvas");
//            var d1 = document.getElementById("mapContainer");
            d.style.height = (a - 80) + "px";//d1.style.height =
            d.style.width = ( w - 40) + "px";//d1.style.width =
        }
        a();
        if(window.addEventListener){
            window.addEventListener("resize",a);
        }
        else{
            window.attachEvent("onresize",a);
        }
    })();
</script>
</html>