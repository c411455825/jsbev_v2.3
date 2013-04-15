package com.bev;

import java.io.IOException; 
import java.io.PrintWriter;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class BevMain extends HttpServlet {
	//private static Logger log=Logger.getLogger(BevMain.class.getName());
	private PageManager myPageManager;

	/**
	 * Constructor of the object.
	 */
	public BevMain() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
		// Put your code here
	}

	/**
	 * The doGet method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		this.doRequest(request, response);
	}

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to post.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		this.doRequest(request, response);
	}
	
	public void doRequest(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
		String method = request.getParameter("m");
		//String index = request.getParameter("i");
		String result = null;
		if(method.equals("newpage")){
			result = myPageManager.createNewPage(request, response);
		}
		else{
			request.getRequestDispatcher("/welcome.html").forward(request,response);
		}
		if(result!=null){
			PrintWriter out = response.getWriter();
			out.print(result);
			out.flush();
			out.close();
		}
	}

	/**
	 * Initialization of the servlet. <br>
	 *
	 * @throws ServletException if an error occurs
	 */
	public void init() throws ServletException {
		// Put your code here
		myPageManager = new PageManager();
	}

}
