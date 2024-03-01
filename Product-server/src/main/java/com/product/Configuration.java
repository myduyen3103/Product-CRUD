/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.product;

import com.google.gson.Gson;
import com.product.utils.database.ProductDAO;
import com.product.utils.database.*;

/**
 *
 * @author vnitd
 */
public class Configuration {

    public static final Gson gson = new Gson();

    private static final String HOST = "localhost";
    private static final String DATABASE = "ProductDB";
    private static final String USER = "sa";
    private static final String PASS = "1";
    public static final String CONNECTION_URL = "jdbc:sqlserver://" + HOST + ";database=" + DATABASE + ";user=" + USER + ";password=" + PASS + ";encrypt=true;trustServerCertificate=true;loginTimeout=30;";

    public static ProductDAO products;
}
