/**
 * 
 */
package com.bev;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.http.HttpServlet;

import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

/**
 * @author crazyliu
 *
 */
public class BevInit extends HttpServlet implements ServletContextListener{
	
	private static Logger log = null;
	/**
	 * 
	 */
	public BevInit() {
		// TODO Auto-generated constructor stub
		
	}
	
	public void contextInitialized(ServletContextEvent sce){
		String rootpath = sce.getServletContext().getRealPath("/");
		System.out.println("rootpath..................:"+rootpath);
		String log4jPath = sce.getServletContext().getInitParameter("log4jpath");
		System.out.println("log4jpath..................:"+log4jPath);
		System.out.println(rootpath+log4jPath);
		PropertyConfigurator.configure(rootpath+log4jPath);
		log=Logger.getLogger(BevMain.class.getName());
		log.info("teste*********************************88");
		log.log(Level.DEBUG, "testetetetefegfergregre---------999999999999");
	}
	
	public void contextDestroyed(ServletContextEvent sce) {
		   //用于在容器关闭时,操作
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

}
