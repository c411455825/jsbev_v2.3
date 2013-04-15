/**
 * 
 */
package com.bev.util;

import java.io.UnsupportedEncodingException;
import java.net.*;
import java.util.ArrayList;

/**
 * @author liuhong
 * 
 */
public class Test {

	/**
	 * 
	 */
	public Test() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param args
	 * @throws UnsupportedEncodingException
	 */
	public static void main(String[] args) throws UnsupportedEncodingException {
		// TODO Auto-generated method stub

		//String testStr = "%E9%95%BF%E6%98%A5%E5%B8%82%E5%8C%BA%E5%9B%BE";
		//System.out.println(URLDecoder.decode(testStr /* "utf-8" */));
		
		String mapCtrl = "0";
		String mapCtrlCodeStr = "";
		String[] mapCtrlIds = mapCtrl.split("_");
		StringBuffer mapCtrlCodeStrBf = new StringBuffer();
		for(int i=0;i<mapCtrlIds.length;i++){
			String temp = null;
			switch(Integer.parseInt(mapCtrlIds[i])){
				case 1:temp="new SuperMap.Control.ScaleLine()";break;
				case 2:temp="new SuperMap.Control.PanZoomBar()";break;
				case 3:temp="new SuperMap.Control.Navigation({ dragPanOptions:{enableKinetic:true}})";break;
				case 4:temp="new SuperMap.Control.OverviewMap()";break;
			}
			mapCtrlCodeStrBf.append(temp);
			if(i<mapCtrlIds.length-1){mapCtrlCodeStrBf.append(",");}
		}
		mapCtrlCodeStr = mapCtrlCodeStrBf.toString();
		if(mapCtrlCodeStr==null)mapCtrlCodeStr="";
		System.out.println(mapCtrlCodeStr);
	}

}
