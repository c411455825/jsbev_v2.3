package com.bev;

import java.io.IOException;
import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bev.util.FileManger;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.util.JSONUtils;

import com.bev.util.*;

public class PageFactory {

	private String htmlStr = null;

	private String newLayerJs = "";

	private Boolean isAsync = false;

	private String asyncLayerJs = null;

	private String includeScriptStr = "";

	private ArrayList variableArr = new ArrayList();

	private ArrayList addlayersArr = new ArrayList();

	public PageFactory() {

	}

	public String create(HttpServletRequest request, HttpServletResponse response) {
		String name = "demo";
		String index = null;
		try {
			//name = request.getParameter("name");
			String dataStr = request.getParameter("data");
			if (dataStr != null) {//name != null && 
				//name = name.toString().trim();
				dataStr = dataStr.toString().trim();

				JSONObject data = JSONObject.fromObject(dataStr);

				this.createJs(data);
				
				String path = Commen.getPath(this);
				
				index = path + name + ".html";
				
				//FileManger.writeTxt(path+"data/json/", name+".json", dataStr);
				FileManger.writeTxt(path, name+".html", this.htmlStr);
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "{\"index\":\""+name+"\"}";
		//return name;
	}

	public void createJs(JSONObject data) throws IOException {
		if (data.has("map") && data.has("demo")) {
			JSONObject map = data.getJSONObject("map");
			JSONObject demo = data.getJSONObject("demo");

			String template = demo.getString("template");
			this.htmlStr = this.getTemplate(template);
			//this.htmlStr = this.htmlStr.replaceAll("\n", "\\{_br_\\}");
			this.replaceSimpleTxt(demo);
			this.controls(map);
			this.newLayers(map);
			this.setCenterStr(map);
			if(template.equals("t1")||template.equals("t3"))this.menuStr(demo,template);
			if(template.equals("t2"))this.t2ControlStr(demo,template);
			
			this.variableArr.add("map");
			this.variableArr.add("myWidgetControl");
			this.variableArr.add("myMenuPanel");
			String variableJsStr = Commen.join(this.variableArr, ",");
			variableJsStr = "var " + variableJsStr + ";";
			this.htmlStr = this.htmlStr.replaceAll("\\{_variable_\\}", variableJsStr);
			this.htmlStr = this.htmlStr.replaceAll("\\{_br_\\}", "\n");
			this.htmlStr = this.htmlStr.replaceAll("\\{_[0-9a-zA-Z]*_\\}", " ");
		}
	}

	private void menuStr(JSONObject demo,String templete) {
		try {
			JSONArray menus = demo.getJSONArray("widgets");
			String str = "";
			ArrayList menusJsArr = new ArrayList();
			if (!menus.isEmpty()) {
				int bkNum = this.getBankNums("\\{_menus(\\d+)_\\}");
				for (int i = 0; i < menus.size(); i++) {
					JSONObject m = menus.getJSONObject(i);
					String basePath = Commen.getPath(this);

					String path = basePath + "factory/models/"+templete+"/" + m.getString("path");
					String tp;

					tp = FileManger.readTxt(path);

					String bankStr = this.getBanks(bkNum);
					tp = bankStr + tp;
					tp = tp.replaceAll("\n", "\n" + bankStr);
					
					String variableStr = "my" + Commen.upFirstLetter(m.getString("id"));
					
					menusJsArr.add(tp);
					this.variableArr.add(variableStr);
				}
				
				str = Commen.join(menusJsArr, ",\n");
				this.htmlStr = this.htmlStr.replaceAll("\\{_menus(\\d+)_\\}", str);
			}
			else{
				this.htmlStr = this.htmlStr.replaceAll("\\{_MenuPanel_\\}(.|\n)*\\{_MenuPanelend_\\}", " ");
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	private void t2ControlStr(JSONObject demo,String templete){
		try {
			JSONArray menus = demo.getJSONArray("widgets");
			String str = "";
			ArrayList iconsJsArr = new ArrayList();
			ArrayList accordionsJsArr = new ArrayList();
			if (!menus.isEmpty()) {
				//int bkNum = this.getBankNums("\\{_menus(\\d+)_\\}");
				for (int i = 0; i < menus.size(); i++) {
					JSONObject m = menus.getJSONObject(i);
					String basePath = Commen.getPath(this);

					String path = basePath + "factory/models/"+templete+"/" + m.getString("path");
					String tp;

					tp = FileManger.readTxt(path);
					String id = m.getString("id");
					int bkNum = 0;
					String variableStr = null;
					if(id.equals("measure")||id.equals("geolocate")){
						bkNum = this.getBankNums("\\{_icons(\\d+)_\\}");
						String bankStr = this.getBanks(bkNum);
						tp = bankStr + tp;
						tp = tp.replaceAll("\n", "\n" + bankStr);
						
						variableStr = "my" + Commen.upFirstLetter(id);
						
						iconsJsArr.add(tp);
					}
					else{
						bkNum = this.getBankNums("\\{_accordions(\\d+)_\\}");
						String bankStr = this.getBanks(bkNum);
						tp = bankStr + tp;
						tp = tp.replaceAll("\n", "\n" + bankStr);
						
						variableStr = "my" + Commen.upFirstLetter(id);
						
						accordionsJsArr.add(tp);
					}
					
					this.variableArr.add(variableStr);
				}
				
				str = Commen.join(iconsJsArr, "\n");
				this.htmlStr = this.htmlStr.replaceAll("\\{_icons(\\d+)_\\}", str);
				
				str = Commen.join(accordionsJsArr, "\n");
				this.htmlStr = this.htmlStr.replaceAll("\\{_accordions(\\d+)_\\}", str);
			}
			else{
				this.htmlStr = this.htmlStr.replaceAll("\\{_icons(\\d+)_\\}", " ");
				
				this.htmlStr = this.htmlStr.replaceAll("\\{_accordions(\\d+)_\\}", " ");
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	private void setCenterStr(JSONObject map) {
		String str = "map.setCenter(new SuperMap.LonLat("
				+ map.getString("center") + ")," + map.getString("zoom") + ");";
		if (this.isAsync) {
			this.htmlStr = this.htmlStr.replaceAll(
					"\\{_setcenter_addlayer_\\}", str);
			this.htmlStr = this.htmlStr
					.replaceAll("\\{_setcenter_init_\\}", "");
		} else {
			this.htmlStr = this.htmlStr.replaceAll("\\{_setcenter_init_\\}",
					str);
		}
	}

	private void newLayers(JSONObject map) {
		JSONArray layersArr = map.getJSONArray("layers");
		if (!layersArr.isEmpty()) {
			for (int i = 0; i < layersArr.size(); i++) {
				JSONObject layerObj = layersArr.getJSONObject(i);
				String type = layerObj.getString("type");
				if (type.equals("cloud")) {
					this.newLayerJs += " layer" + i
							+ " = new SuperMap.Layer.CloudLayer();\n";
				} else if (type.equals("tiled")) {
					String strUrl = layerObj.getString("url");
					String strName = layerObj.getString("name");
					this.isAsync = true;
					String temp = " layer"
							+ i
							+ " = new SuperMap.Layer.TiledDynamicRESTLayer(' "
							+ strName
							+ "','"
							+ strUrl
							+ "', { transparent: true, cacheEnabled: true }, { maxResolution: 'auto' });\n";
					temp += " layer" + i
							+ ".events.on({ 'layerInitialized': addLayer });\n";
					this.asyncLayerJs = temp;
				} else if (type.equals("tdtlayer")) {
					this.newLayerJs += " layer" + i
							+ " = new SuperMap.Layer.TDTLayer();\n";
					this.includeScriptStr += "<script src=\"./js/TDTLayer.js\" ></script>\n";
				} else if (type.equals("google")) {
					this.newLayerJs += " layer" + i
							+ " = new SuperMap.Layer.Google();\n";
					this.includeScriptStr += "<script src=\"http://maps.google.com/maps/api/js?v=3.5&amp;sensor=false\">"
							+ "</script" + ">\n";
					this.includeScriptStr += "<script src=\'./js/layer/SphericalMercator.js\'>"
							+ "</script" + ">\n";
					this.includeScriptStr += "<script src=\'./js/layer/EventPane.js\'>"
							+ "</script" + ">\n";
					this.includeScriptStr += "<script src=\'./js/layer/FixedZoomLevels.js\'>"
							+ "</script" + ">\n";
					this.includeScriptStr += "<script src=\'./js/layer/Google.js\'>"
							+ "</script" + ">\n";
					this.includeScriptStr += "<script src=\'./js/layer/v3.js\'>"
							+ "</script" + ">\n";
				} else if (type.equals("osm")) {
					this.newLayerJs += " layer" + i
							+ " = new SuperMap.Layer.OSM('osmLayer');\n";
					this.includeScriptStr += "<script src='./js/layer/OSM.js'>"
							+ "</script" + ">\n";
				} else if (type.equals("arcgis")) {
					String strUrl = layerObj.getString("url");
					String strName = layerObj.getString("name");
					this.newLayerJs += "layer" + i
							+ " = new SuperMap.Layer.ArcGIS93Rest('" + strName
							+ "','" + strUrl + "');\n";
					this.includeScriptStr += "<script src='./js/layer/ArcGIS93Rest.js'>"
							+ "</script" + ">\n";
				} else if (type.equals("baidu")) {
					this.newLayerJs += "layer" + i
							+ " = new SuperMap.Layer.Baidu();\n";
					this.includeScriptStr += "<script src='./js/layer/Baidu.js'>"
							+ "</script" + ">\n";
				} else if (type.equals("bing")) {
					String apiKey = "AqTGBsziZHIJYYxgivLBf0hVdrAk9mWO5cQcb8Yux8sW5M8c8opEC2lZqKR1ZZXf";
					this.newLayerJs += "layer"
							+ i
							+ " = new SuperMap.Layer.Bing("
							+ "{\n                name: \"Road\",\n                key: \""
							+ apiKey
							+ "\",                type: \"Road\"\n            }"
							+ ");\n";
					this.includeScriptStr += "<script src='./js/layer/Bing.js'>"
							+ "</script" + ">\n";
				}

				this.variableArr.add("layer" + i);
				this.addlayersArr.add("layer" + i);
			}

			String addLayerJs = Commen.join(this.variableArr, ",");
			addLayerJs = "map.addLayers([" + addLayerJs + "])";

			if (this.isAsync) {
				String tp = this.htmlStr;
				tp = tp.replaceAll("\\{_newlayers_init_\\}", this.asyncLayerJs);
				tp = tp.replaceAll("\\{_addlayers_init_\\}", "");
				tp = tp.replaceAll("\\{_setcenter_init_\\}", "");
				tp = tp.replaceAll(
						"\\{_addlayerfun_\\}(.+)\\{_addlayerfunend_\\}", "$1");
				tp = tp.replaceAll("\\{_newlayers_addlayer_\\}",
						this.newLayerJs);
				tp = tp.replaceAll("\\{_addlayers_addlayer_\\}", addLayerJs);
				this.htmlStr = tp;
			} else {
				String tp = this.htmlStr;
				tp = tp.replaceAll("\\{_newlayers_init_\\}", this.newLayerJs);
				tp = tp.replaceAll("\\{_addlayers_init_\\}", addLayerJs);
				tp = tp.replaceAll(
						"\\{_addlayerfun_\\}.+\\{_addlayerfunend_\\}", "");
				this.htmlStr = tp;
			}
		}
	}

	private String getTemplate(String name) throws IOException {
		String templateJS = null;
		if (name == null)
			name = "t1";

		String basePath = Commen.getPath(this);

		String path = basePath + "factory/templete/" + name;
		templateJS = FileManger.readTxt(path);

		return templateJS;
	}

	private void replaceSimpleTxt(JSONObject demo) {
		String title = demo.getString("title");
		String theme = demo.getString("theme");
		this.htmlStr = this.htmlStr.replaceAll("\\{_title_\\}", title);
		this.htmlStr = this.htmlStr.replaceAll("\\{_theme_\\}", theme);
	}

	private void controls(JSONObject map) {
		JSONArray ctrls = map.getJSONArray("controls");
		String str = "";
		if (!ctrls.isEmpty()) {
			int bankNum = this.getBankNums(".*\\{_controls(\\d+)_\\}.*");

			for (int i = 0; i < ctrls.size(); i++) {
				String name = ctrls.getString(i);
				String temp = "";
				if (name.equals("Navigation")) {
					temp = this.getBanks(bankNum)
							+ "new SuperMap.Control.Navigation({ dragPanOptions: { enableKinetic: true } })";
				} else {
					temp = this.getBanks(bankNum) + "new SuperMap.Control."
							+ name + "()";
				}
				str += temp;
				if (i < ctrls.size() - 1) {
					str += ",\n";
				}
			}
			this.htmlStr = this.htmlStr.replaceAll("\\{_controls\\d+_\\}", str);
		}
		else{
			this.htmlStr = this.htmlStr.replaceAll("\\{_controls\\d+_\\}", " ");
		}
	}

	private int getBankNums(String regex) {
		int count  = 0;
//		try{
//			regex = ".*|\n*\\{_menus(\\d+)_\\}.*|\n*";
//			String test = "ffff\nffffff{_menus232_}ffffffffff";
//			String countStr = test.replaceAll(regex, "$1");
//			String countStr1 = this.htmlStr.replaceAll(regex, "$1");
//			count = Integer.parseInt(countStr);
//		}
//		catch(Exception e){
//			System.out.println(e);
//		}
		try{
			//regex = "\\{_menus(\\d+)_\\}";
			//String test = "fffff\nffffffff{_menus23_}ffffffffffffffffffffff";
			Pattern p = Pattern.compile(regex);
			Matcher m = p.matcher(this.htmlStr);
			if(m.find()){
				String temp = m.group();
				String countStr = temp.replaceAll(regex, "$1");
				count = Integer.parseInt(countStr);
			}
		}
		catch(Exception e){
			
		}

		return count;
	}

	private String getBanks(int num) {
		String t = "";
		for (int i = 0; i < num; i++) {
			t += " ";
		}
		return t;
	}

}
