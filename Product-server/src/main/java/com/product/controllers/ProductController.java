package com.product.controllers;

import com.product.Configuration;
import com.product.models.Product;
import com.product.models.dto.StatusDto;
import com.product.utils.database.ProductDAO;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;



/**
 *
 * @author hoang hung
 */
@WebServlet(name = "ProductController", urlPatterns = {"/api/product"})
public class ProductController extends HttpServlet {
    public static final ProductDAO dbContext = Configuration.products;

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        int id = Integer.parseInt(req.getParameter("id"));
        dbContext.delete(id);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String name = req.getParameter("name");
        int quantity = Integer.parseInt(req.getParameter("quantity"));
        int price = Integer.parseInt(req.getParameter("price"));
        dbContext.add(name, quantity, price);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
       PrintWriter print = resp.getWriter();
       
       List<Product> productList = dbContext.getAll();
       print.print(productList);
    }
    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter out = resp.getWriter();
        try {
            int id = Integer.parseInt(req.getParameter("id"));
            String name = req.getParameter("name");
            int quantity = Integer.parseInt(req.getParameter("quantity"));
            int price = Integer.parseInt(req.getParameter("price"));
            Product p = new Product(id, name, quantity, price, null);

            if (dbContext.update(p) == 1) {
                out.print(new StatusDto(0, "Update product successfully!"));
            } else {
                out.print(new StatusDto(1, "Update product failed!"));
            }
        } catch (NumberFormatException e) {
            out.print(new StatusDto(1, "Update product failed!"));
            Logger.getLogger(ProductController.class.getName()).log(Level.SEVERE, null, e);
        }
    }
    
    
}
