package com.bev.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.ArrayList;

public class FileManger {
	public static String readTxt(String fileName) throws IOException {
		BufferedReader br = new BufferedReader(new FileReader(fileName));
		String str = "";
		String r = br.readLine();
		while (r != null) {
			str += r+"\n";
			r = br.readLine();
		}
		return str;
	}

	public static void writeTxt(String path, String name,String content) {
		try {
			content.replaceAll("\n", "\\n");
			File file = new File(path + name);
			File fPath = new File(path);

			FileWriter fw = null;
			if (!fPath.isDirectory()) {
				fPath.mkdirs();
			}
			if (!file.isFile()) {

				file.createNewFile();
				//fw = new FileWriter(path + name);
			}
			OutputStreamWriter outputStream = new OutputStreamWriter(new FileOutputStream(file),"GBK");
			outputStream.write(content);
			outputStream.flush();
			outputStream.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static ArrayList getFileList(String path){
		ArrayList files = new ArrayList();
		File[] fileList = null;
		File directory = new File(path);
		if(directory.exists()){
			fileList = directory.listFiles();
			for(int i=0;i<fileList.length;i++){
				files.add(fileList[i].getName());
			}
		}
		
		return files;
	}
}
