/**
 * Class: CF_Main
 * 配置界面。
 */
(function(){
    function A(){
        var t = this;
        t.toolBarBd = null;
        t.isToolBarShow = true;
        t.toolBarButtonIcon = null;
        t.toolBarContent = null;
        t.mapFrame = null;
        t.confParam = {
            "templete":"t1",
            "theme":"cupertino",
            "title":"supermap",
            "layerType":1,
            "mapCtrl":"1_2_3",
            "bevCtrl":"1_2_3"
        };
        t.lonInput = null;
        t.latInput = null;
        t.levelInput = null;
        t.iserverLayerInfoBody = null;
        t.iserverLayerInfoLoading = null;
        t.mapControlCheckBoxes = [];
        t.bevControlCheckBoxes = [];
        t.isGetIServerLayerInfo = false;
        t.iserverLayerInfoSelectBar = null;
        t.requestsObj = {};
        t.zoomBarCheckBox = null;
        //t.isReLoadDemo = false;
        t.createToolbar();
        t.createStep1();
        t.createStep2();
        t.createStep3();
        t.createStep4();
        t.createStep5();

        t.setMapStatus();
    }
    var B = A.prototype;
    /**
     * Method: createToolbar
     * 创建配置工具栏。
     */
    B.createToolbar = function(){
        var body,bk,ct,btn,d1,t = this;

        t.toolBarBd = body = $("#toolbar");
        bk = $("<div>")
            .css({
                "position":"absolute",
                "height":"100%",
                "width":"100%",
                "opacity":0.8,
                "filter":"alpha(opacity=80)",
                "border-right": "1px solid #aed0ea",
                "z-index":-5
            })
            .addClass("ui-widget-overlay")
            .appendTo(body);

        t.toolBarContent = ct = $("<div>")
            .css({
                "position":"absolute",
                "height":"100%",
                "width":"100%",
                "overflow":"auto"
            })
            .appendTo(body);

        btn = $("<div>")
            .css({
                "position":"absolute",
                "height":"60px",
                "width":"20px",
                "left":"370px",
                "top":"100px",
                "border":"#AED0EA 1px solid"
            })
            .addClass("ui-widget-overlay ui-corner-tr ui-corner-br")
            .click(function(){
                if(t.isToolBarShow){
                    t.hideToolBar();
                }
                else{
                    t.showToolBar();
                }
            })
            .appendTo(body);

        t.toolBarButtonIcon = d1 = $("<button>")
            .button({
                icons: {
                    primary: "ui-icon-circle-triangle-w"
                },
                text: false
            })
            .css({
                "border":"0px solid #000",
                "background":"none",
                "position":"absolute",
                "width":"16px",
                "height":"16px",
                "left":"2px",
                "top":"22px"
            })
            .appendTo(btn);

        resizeFunctions.push(function(height){
            btn.css({
                "top":((height-60)/2)+"px"
            });
        });
    }
    B.hideToolBar = function(){
        var t = this;

        this.toolBarBd.css({
            "left":"0px"
        });

        this.toolBarBd.animate({left:'-370px'},"fast",function(){
            t.isToolBarShow = false;
            t.toolBarButtonIcon.button({
                icons: {
                    primary: "ui-icon-circle-triangle-e"
                }
            });
        });
    }
    B.showToolBar = function(){
        var t = this;
        this.toolBarBd.css({
            "left":"-370px"
        });

        this.toolBarBd.animate({left:'0px'},"fast",function(){
            t.isToolBarShow = true;
            t.toolBarButtonIcon.button({
                icons: {
                    primary: "ui-icon-circle-triangle-w"
                }
            });
        });
    }
    B.createStep1 = function(){
        var d1, b,t = this;

        var templeteArr = [
            {
                "name":"模板一",
                "value":"t1"
            },
            {
                "name":"模板二",
                "value":"t2"
            },
            {
                "name":"模板三",
                "value":"t3"
            }
        ];

        b = t.toolBarContent;

        d1 = $("<div>")
            .html("1.选择模板")
            .css({
                "margin":"20px 0px 0px 10px"
            })
            .appendTo(b);

        d1 = $("<div>")
            .css({
                "margin":"10px 0px 0px 10px"
            })
            .appendTo(b);

        this.createSelectBar(d1,templeteArr,function(txt){
            t.confParam.templete = txt;
            if(txt=="t3"){
                t.zoomBarCheckBox
                    .attr({
                        "disabled":true,
                        "checked":false
                    });
            }
            else{
                t.zoomBarCheckBox
                    .attr({
                        "disabled":false,
                        "checked":"checked"
                    });
            }
            t.confParam.mapCtrl = t.getMapCtrlsStr();
            t.setDemoPara(t.confParam);
        },30,150);
    }
    B.createSelectBar = function(div,txtArr,onSelect,height,width){
        var s1,o1,me=this;

        s1 = $("<select>")
            .css({
                "height":height+"px",
                "width":width+"px"
            })
            //.attr({"name":"请选择:"})
            .change(function(onSelect){
                return function(){
                    //var t = $(this);
                    onSelect($(this).attr("value"));
                    $(me.mapFrame).focus();
//                    window.setTimeout(function(t){
//                        return function(){
//
//                        }
//                    }(t),30)
                }
            }(onSelect))
//            .scroll(function(e){
//                debugger;
//                if (e) //停止事件冒泡
//                    e.stopPropagation();
//                else
//                    window.event.cancelBubble = true;
//                return false;
//            })
            .appendTo(div);
//        $(document).click(function(s1){
//            return function(){
//                s1.blur();
//            }
//        }(s1));
//        var scrollFunc=function(e){
//            if(e)
//                e.stopPropagation();
//            else
//                window.event.cancelBubble = true;
//            return false;
//        }
//
//        if(s1[0].addEventListener){
//            s1[0].addEventListener('DOMMouseScroll',scrollFunc,false);
//        }
//        s1[0].onmousewheel=scrollFunc;

        for(var i=0;i<txtArr.length;i++){
            if(txtArr[i].isTitle){
                o1 = $("<option>")
                    .html(txtArr[i].name)
                    .attr({
                        "value":"",
                        "disabled":true,
                        "selected":true
                    })
                    .appendTo(s1);
            }
            else{
                o1 = $("<option>")
                    .html(txtArr[i].name||txtArr[i])
                    .attr("value",txtArr[i].value||txtArr[i])
                    .appendTo(s1);
            }
        }

        return s1;
    }
    B.createStep2 = function(){
        var d1, b,t = this;

        var skinArr = [
            "cupertino",
            "base",
            "black-tie",
            "blitzer",
            "dark-hive",
            "dot-luv",
            "eggplant",
            "excite-bike",
            "flick",
            "hot-sneaks",
            "humanity",
            "le-frog",
            "mint-choc",
            "overcast",
            "pepper-grinder",
            "redmond",
            "smoothness",
            "south-street",
            "start",
            "sunny",
            "swanky-purse",
            "trontastic",
            "ui-darkness",
            "ui-lightness",
            "vader"
        ];
        b = t.toolBarContent;
        d1 = $("<div>")
            .html("2.选择主题")
            .css({
                "margin":"20px 0px 0px 10px"
            })
            .appendTo(b);

        d1 = $("<div>")
            .css({
                "margin":"10px 0px 0px 10px"
            })
            .appendTo(b);

        this.createSelectBar(d1,skinArr,function(txt){
            t.confParam.theme = txt;

            t.setDemoPara(t.confParam);
        },30,150);
    }
    B.setDemoPara = function(param){
        var url = "../config.jsp?",me=this;
        var txtArr = [],paramStr;
        if(!this.mapFrame){
            this.mapFrame = document.getElementById("mapFrame");
        }

        for(var key in param){
            txtArr.push(key+"="+param[key]);
        }
        paramStr = txtArr.join("&");
        url += paramStr;

        this.mapFrame.src = url;
        //this.isReLoadDemo = true;
        window.setTimeout(function(){
            me.setMapStatus();
        },300);
    }
    B.createStep3 = function(){
        var b,d1,d2,t = this;

        b = t.toolBarContent;
        d1 = $("<div>")
            .html("3.设置地图参数")
            .css({
                "margin":"20px 0px 0px 10px"
            })
            .appendTo(b);

        d1 = $("<div>")
            .css({
                "margin":"10px 0px 0px 10px"
            })
            .appendTo(b);

        t.createInput(d1,"地图名称:","SuperMap",null,null,null,function(value){
            value = value||"";
            t.confParam.title = value;
        });

        d1 = $("<div>")
            .html("选择地图服务:")
            .css({
                "margin":"20px 0px 0px 10px"
            })
            .appendTo(b);

        d1 = $("<div>")
            .css({
                "margin":"10px 0px 0px 10px"
            })
            .appendTo(b);

        var serviceTypes = [
            {"name":"SuperMap云服务","value":1},//1
            {"name":"SuperMap iServer Java 6R服务","value":2},//2
            {"name":"Google地图","value":3},//3
            {"name":"OpenStreet Map","value":4},//4
            {"name":"天地图","value":5},//5
            {"name":"ArcGis Online","value":6},//6
            {"name":"百度地图","value":7},//7
            {"name":"Bing 地图","value":8}//8
        ];

        this.createSelectBar(d1,serviceTypes,function(txt){
            if(txt==2){
                if(!t.isGetIServerLayerInfo){
                    t.getIServerLayersInfo();
                    t.isGetIServerLayerInfo = true;
                }
                else{
                    t.iserverLayerInfoBody.css({
                        "display":"block"
                    });

                    if(t.iserverLayerInfoSelectBar){
                        t.iserverLayerInfoSelectBar[0].selectedIndex = 0;
                    }
                }
            }
            else{
                if(t.iserverLayerInfoBody){
                    t.iserverLayerInfoBody.css({
                        "display":"none"
                    });
                }
                t.confParam.layerType = txt;
                t.confParam.x = "";
                t.confParam.y = "";
                t.confParam.z = "";
                t.setDemoPara(t.confParam);
            }
        },30,205);

        this.iserverLayerInfoBody = $("<div>")
            .css({
                "margin":"10px 0px 0px 10px",
                "display":"none"
            })
            .appendTo(b);

        this.iserverLayerInfoLoading = new SuperMap.Bev.Loading({
            "body":$("<div>")
                .css({
                    "margin":"10px 0px 0px 90px",
                    "display":"none"
                })
                .appendTo(b)
        });

        d1 = $("<div>")
            .html("地图中心点:")
            .css({
                "margin":"20px 0px 0px 10px"
            })
            .appendTo(b);

        d1 = $("<div>")
            .css({
                "margin":"10px 0px 0px 10px",
                "height":"26px"
            })
            .appendTo(b);

        d2 = t.createInput(d1,"经度","","40px","100px",true);
        t.lonInput = d2[1];
        d2 = t.createInput(d1,"纬度","","40px","100px",true);
        t.latInput = d2[1];

        d1 = $("<div>")
            .css({
                "margin":"10px 0px 0px 10px"
            })
            .appendTo(b);

        d2 = t.createInput(d1,"地图级别:","",null,"40px",true);
        t.levelInput = d2[1];


        d1 = $("<div>")
            .html("选择地图控件:")
            .css({
                "margin":"20px 0px 0px 10px"
            })
            .appendTo(b);

        d1 = $("<div>")
            .css({
                "margin":"10px 0px 0px 10px"
            })
            .appendTo(b);
        this.zoomBarCheckBox = this.createCheckBox("缩放控件",true,d1,checkBoxChange);
        this.mapControlCheckBoxes.push([this.createCheckBox("比例尺",true,d1,checkBoxChange),1]);
        this.mapControlCheckBoxes.push([this.zoomBarCheckBox,2]);
        this.mapControlCheckBoxes.push([this.createCheckBox("导航控件",true,d1,checkBoxChange),3]);
        this.mapControlCheckBoxes.push([this.createCheckBox("鹰眼",false,d1,checkBoxChange),4]);

        function checkBoxChange(){
            t.confParam.mapCtrl = t.getMapCtrlsStr();

            t.setDemoPara(t.confParam);
        }
    }
    B.getMapCtrlsStr = function(){
        var bs = this.mapControlCheckBoxes;
        var names = [];
        var nameStr = "";
        for(var i=0;i<bs.length;i++){
            var isChecked = (bs[i][0].attr("checked")=="checked");
            var id = bs[i][1];

            if(isChecked){
                names.push(id);
            }
        }

        if(names.length>0){
            nameStr = names.join("_");
        }
        else{
            nameStr = "0";
        }

        return nameStr;
    }
    B.createInput = function(container,title,defaultContent,width1,width2,isDisable,keyup){
        var d0,d1;

        d0 = $("<span>")
            .css({
                "display":"inline-block",
                "vertical-align":"top",
                "width":width1||"100px",
                "padding-top":"5px"
            })
            .html(title)
            .appendTo(container);

        d1 = $("<input>")
            .attr({
                "value":defaultContent||"",
                "type":"text"
            })
            .css({
                "vertical-align":"top",
                "width":width2||"200px",
                "margin-right":"5px"
            })
            .appendTo(container);

        if(isDisable)d1.attr({
            "disabled":"disabled"
        });

        if(keyup){
            d1.keyup(function(keyup){
                return function(){
                    keyup($(this).attr("value"));
                }
            }(keyup));
        }

        return [d0,d1];
    }
    B.setMapStatus = function(){
        var me = this;
        var frame = document.getElementById("mapFrame");
        //var frameWindow = frame.contentWindow;
        checkMapLoaded();

        function checkMapLoaded(){
            if(frame.contentWindow.SMLoaded){
                me.frameMap = frame.contentWindow.map;
//                if(me.isReLoadDemo){
//                    moveMap();
//                }
//                else{
//                    setStatus();
//                }
                setStatus();
                frame.contentWindow.map.events.register("moveend", me, setStatus);
                //me.isReLoadDemo = false;
                frame.contentWindow.SMLoaded = false;
                return;
            }
            window.setTimeout(checkMapLoaded,1000);
        }

        function setStatus(){
            var center = me.frameMap.getCenter();
            var lon = center.lon;
            var lat = center.lat;
            var level = me.frameMap.getZoom();

            me.lonInput.attr("value",lon);
            me.latInput.attr("value",lat);
            me.levelInput.attr("value",level);

            me.confParam.x = lon;
            me.confParam.y = lat;
            me.confParam.z = level;
        }

//        function moveMap(){
//            var lon = parseFloat(me.lonInput.attr("value"));
//            var lat = parseFloat(me.latInput.attr("value"));
//            var level = parseFloat(me.levelInput.attr("value"));
//            me.frameMap.setCenter(new SuperMap.LonLat(lon , lat) , level);
//        }
    }
    B.getIServerLayersInfo = function(){
        this.iserverLayerInfoLoading.show();
        var url = window.iserverPath||window.location.host,t=this;
        url = "http://"+url+"/iserver/services.jsonp";

//        $.ajax({
//            "dataType":"jsonp",
//            "error":function(){},
//            "success":function(data){
//                var layerInfo = [];
//                if(data&&data.length){
//                    for(var i=0;i<data.length;i++){
//                        var obj = data[i];
//                        var name = obj.name;
//                        if(name.match(/map-[A-z0-9]*\/rest/)){
//                            layerInfo.push({
//                                "name":name,
//                                "value":obj.url
//                            });
//                        }
//                    }
//                    create(layerInfo);
//                }
//            },
//            "type":"GET",
//            "url":url
//        });

        this.request(url,function(data){
            var urls = [];
            if(data&&data.length){
                for(var i=0;i<data.length;i++){
                    var obj = data[i];
                    var name = obj.name;
                    if(name.match(/map-[A-z0-9]*\/rest/)){
                        urls.push(obj.url + "/maps.jsonp");
                    }
                }
                t.requests(urls,function(datas){
                    var layerInfo = [{
                        "name":"请选择",
                        "value":"",
                        "isTitle":true
                    }];
                    if(datas&&datas.length){
                        for(var i=0;i<datas.length;i++){
                            for(var j=0;j<datas[i].length;j++){
                                var tpob = datas[i][j];
                                layerInfo.push({
                                    "name":tpob.name,
                                    "value":tpob.path
                                });
                            }
                        }
                        create(layerInfo);
                    }
                })
                //create(layerInfo);
            }
        })

        function create(layerInfo){
            t.iserverLayerInfoLoading.hide();
            var body = t.iserverLayerInfoBody;
            if(body){
                body.css({
                    "display":"block"
                });

                if(body.html()||body.html()==""){
                    var d1 = $("<div>")
                        .html("选择iServer服务:")
                        .css({
                            "margin":"20px 0px 0px 10px"
                        })
                        .appendTo(body);

                    d1 = $("<div>")
                        .css({
                            "margin":"10px 0px 0px 10px"
                        })
                        .appendTo(body);

                    t.iserverLayerInfoSelectBar = t.createSelectBar(d1,layerInfo,function(txt){
                        t.confParam.layerType = 2;
                        t.confParam.url = escape(txt);
                        t.confParam.x = "";
                        t.confParam.y = "";
                        t.confParam.z = "";
                        t.setDemoPara(t.confParam);
                    },30,205);
                }
            }
        }
    }
    B.request = function(url,callback){
        $.ajax({
            "dataType":"jsonp",
            "error":function(callback){return function(){callback();}}(callback),
            "success":function(callback){return function(data){callback(data);}}(callback),
            "type":"GET",
            "url":url
        });
    }
    B.requests = function(urls,callback){
        var key = new Date().getTime() + "_request",me = this;
        for(var i=0;i<urls.length;i++){
            this.request(urls[i],function(key,length,cur,callback){
                return function(data){
                    if(!me.requestsObj[key]){
                        me.requestsObj[key] = [];
                    }

                    me.requestsObj[key].push(data);

                    if(me.requestsObj[key].length == length){
                        var res = me.requestsObj[key];
                        me.requestsObj[key] = null;
                        callback(res);
                    }
                }
            }(key,urls.length,i,callback));
        }
    }
    /**
     * 创建复选框
     * */
    B.createCheckBox = function(title,isChecked,body,onChange){
        var d1,d2;

        d1 = $("<div>")
            .appendTo(body);

        d3 = $("<input>")
            .attr({
                "type":"checkbox",
                "name":title
            })
            .change(function(){
                if(onChange)onChange();
            })
            .appendTo(d1);

        if(isChecked){
            d3.attr({
                "checked":"Checked"
            });
        }

        d2 = $("<spans>")
            .html(title)
            .appendTo(d1);

        return d3;
    }
    /**
     * 创建第四步,选择功能控件
     * **/
    B.createStep4 = function(){
        var b,d1,t=this;
        b = this.toolBarContent;
        d1 = $("<div>")
            .html("4.选择功能控件")
            .css({
                "margin":"20px 0px 0px 10px"
            })
            .appendTo(b);

        d1 = $("<div>")
            .css({
                "margin":"10px 0px 0px 10px"
            })
            .appendTo(b);

        this.bevControlCheckBoxes.push([this.createCheckBox("量算",true,d1,checkBoxChange),1]);
        this.bevControlCheckBoxes.push([this.createCheckBox("定位",true,d1,checkBoxChange),2]);
        this.bevControlCheckBoxes.push([this.createCheckBox("绘制要素",true,d1,checkBoxChange),3]);

        function checkBoxChange(){
            var bs = t.bevControlCheckBoxes;
            var names = [];
            var nameStr = "";
            for(var i=0;i<bs.length;i++){
                var isChecked = (bs[i][0].attr("checked")=="checked");
                var id = bs[i][1];

                if(isChecked){
                    names.push(id);
                }
            }

            if(names.length>0){
                nameStr = names.join("_");
            }
            else{
                nameStr = "0";
            }
            t.confParam.bevCtrl = nameStr;

            t.setDemoPara(t.confParam);
        }
    }
    /**
     * 创建第五步,提交生成页面
     * */
    B.createStep5 = function(){
        var b,d1,d2,me=this;

        b = this.toolBarContent;
        d1 = $("<div>")
            .css({
                "margin":"10px 0px 0px 10px"
            })
            .appendTo(b);
        d2 = $("<button>")
            .html("生成页面>>")
            .css({
                "font-size":"14px"
            })
            .button()
            .click(function(){
                me.submitPage();
            })
            .appendTo(d1);
    }
    /**
     * 提交参数生成页面
     * */
    B.submitPage = function(){
        var p = this.confParam,p1,layerParam,mapControlParam,bevCtrlParam,t1;

        switch(p.layerType){
            case 1:layerParam = {
                "type":"cloud"
            };
            break;
            case 2:layerParam = {
                "type":"tiled",
                "url":p.url
            };
            break;
            case 3:layerParam = {
                "type":"google"
            };
            break;
            case 4:layerParam = {
                "type":"osm"
            };
            break;
            case 5:layerParam = {
                "type":"tdtlayer"
            };
            break;
            case 6:layerParam = {
                "type":"arcgis"
            };
            break;
            case 7:layerParam = {
                "type":"baidu"
            };
            break;
            case 8:layerParam = {
                "type":"bing"
            };
            break;
        };

        t1 = p.mapCtrl.split("_");
        mapControlParam = [];
        for(var i=0;i<t1.length;i++){
            switch(parseInt(t1[i])){
                case 1:mapControlParam.push("ScaleLine");break;
                case 2:mapControlParam.push("PanZoomBar");break;
                case 3:mapControlParam.push("Navigation");break;
                case 4:mapControlParam.push("OverviewMap");break;
            }
        }

        t1 = p.bevCtrl.split("_");
        bevCtrlParam = [];
        for(var i=0;i<t1.length;i++){
            switch (parseInt(t1[i])){
                case 1:bevCtrlParam.push({
                    "id":"measure",
                    "path":"measure.txt"
                });break;
                case 2:bevCtrlParam.push({
                    "id":"geolocate",
                    "path":"geolocate.txt"
                });break;
                case 3:bevCtrlParam.push({
                    "id":"drawFeature",
                    "path":"drawFeature.txt"
                });break;
            }
        }

        p1 = {
            "map":{
                "center":p.x+","+ p.y,
                "zoom":p.z,
                "layers":[layerParam],
                "controls":mapControlParam
            },
            "demo":{
                "title":p.title,
                "template":p.templete,
                "theme":p.theme,
                "widgets":bevCtrlParam
            }
        };
        var dataStr = this.jsonToStr1(p1).replace(/'/g,"\"");
        $.ajax({
            "data":{
                "data":dataStr,
                "m":"newpage"
            },
            "dataType":"json",
            "error":function(){},
            "success":function(){
                window.location = "../demo.html";
            },
            "type":"POST",
            "url":"../main"
        });
    },
    B.jsonToStr1 = function(obj) {
        var objInn = obj;
        if (objInn == null) {
            return null;
        }
        switch (objInn.constructor) {
            case String:
                //s = "'" + str.replace(/(["\\])/g, "\\$1") + "'";   string含有单引号出错
                objInn = '"' + objInn.replace(/(["\\])/g, '\\$1') + '"';
                objInn= objInn.replace(/\n/g,"\\n");
                objInn= objInn.replace(/\r/g,"\\r");
                objInn= objInn.replace("<", "&lt;");
                objInn= objInn.replace(">", "&gt;");
                objInn= objInn.replace(/%/g, "%25");
                objInn= objInn.replace(/&/g, "%26");
                return objInn;
            case Array:
                var arr = [];
                for(var i=0,len=objInn.length;i<len;i++) {
                    arr.push(this.jsonToStr1(objInn[i]));
                }
                return "[" + arr.join(",") + "]";
            case Number:
                return isFinite(objInn) ? String(objInn) : null;
            case Boolean:
                return String(objInn);
            case Date:
                var dateStr = "{" + "'__type':\"System.DateTime\"," +
                    "'Year':" + objInn.getFullYear() + "," +
                    "'Month':" + (objInn.getMonth() + 1) + "," +
                    "'Day':" + objInn.getDate() + "," +
                    "'Hour':" + objInn.getHours() + "," +
                    "'Minute':" + objInn.getMinutes() + "," +
                    "'Second':" + objInn.getSeconds() + "," +
                    "'Millisecond':" + objInn.getMilliseconds() + "," +
                    "'TimezoneOffset':" + objInn.getTimezoneOffset() + "}";
                return dateStr;
            default:
                if (objInn["toJSON"] != null && typeof objInn["toJSON"] == "function") {
                    return objInn.toJSON();
                }
                if (typeof objInn == "object") {
                    if (objInn.length) {
                        var arr = [];
                        for(var i=0,len=objInn.length;i<len;i++)
                            arr.push(this.jsonToStr1(objInn[i]));
                        return "[" + arr.join(",") + "]";
                    }
                    var arr=[];
                    for (attr in objInn) {
                        //为解决SuperMap.Geometry类型头json时堆栈溢出的问题，attr == "parent"时不进行json转换
                        if (typeof objInn[attr] != "function" && attr != "CLASS_NAME" && attr != "parent") {
                            arr.push("'" + attr + "':" + this.jsonToStr1(objInn[attr]));
                        }
                    }

                    if (arr.length > 0) {
                        return "{" + arr.join(",") + "}";
                    } else {
                        return "{}";
                    }
                }
                return objInn.toString();
        }
    }
    /**
     * 设置缩放按钮状态
     * */
    B._setZoomBarCtrlParam = function(status){//true or false
        var pStr = this.confParam.mapCtrl;
        if(!pStr){
            pStr = "2";
        }
        else{
            if(pStr.indexOf("2")<0){
                if(status){
                    var pArr = pStr.split("_");
                    pArr.push("2");
                    pStr = pArr.join("_");
                }
            }
            else{
                if(!status){
                    var pArr = pStr.split("_");
                    for(var i=0;i<pArr.length;i++){
                        if(pArr=="2"||pArr==2){
                            pArr.splice(i);
                        }
                    }
                    pStr = pArr.join("_");
                }
            }
        }
        this.confParam.mapCtrl = pStr;
    }
    new A();
})()