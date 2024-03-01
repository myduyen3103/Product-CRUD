/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.product.utils.database;

import com.product.models.Product;
import com.product.utils.SQLDatabase;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author admin
 */
public class ProductDAO extends SQLDatabase {
    private String table;
    public ProductDAO(Connection connection) {
        super(connection);
    }
    
    
    //Get data from database 
    public List<Product> getAll(){
        List<Product> res = new ArrayList<>();
        try{
            ResultSet rs = executeQueryPreparedStatement("SELECT * FROM " + table);
            while(rs.next()) {
                res.add(
                        new Product(rs.getInt("id"), 
                                rs.getNString("name"), 
                                rs.getInt("quantity"), 
                                rs.getInt("price"), 
                                rs.getNString("image")));
            }
        } catch (SQLException ex){
            Logger.getLogger(ProductDAO.class.getName()).log(Level.SEVERE, null,ex);
        }
        return res;
    }
    
    public void delete(int id){
        executeUpdatePreparedStatement("DELETE FROM " + table + " WHERE id=?", id);
    }
    }

    