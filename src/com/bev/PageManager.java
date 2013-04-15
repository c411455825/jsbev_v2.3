package com.bev;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bev.util.Commen;
import com.bev.util.FileManger;

public class PageManager {
	/**
	 * Constructor of the object.
	 */
	public PageManager() {

	}

	public String createNewPage(HttpServletRequest request,
			HttpServletResponse response) {
		PageFactory myPageFactory = new PageFactory();
		String name = myPageFactory.create(request, response);

		return name;
	}

	public void skip(HttpServletRequest request, HttpServletResponse response) {
		try {
			ArrayList fileList = FileManger.getFileList(Commen.getPath(this)
					+ "data/page/");
			if (fileList.isEmpty()) {
				request.getRequestDispatcher("/viewer.html").forward(request,
						response);

			} else {
				
			}
		} catch (ServletException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

}
