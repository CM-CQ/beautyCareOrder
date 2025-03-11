package com.gk.study;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author 
 * @email 
 */
@SpringBootApplication
public class MyApp {

    public static void main(String[] args) {
        try {
            SpringApplication.run(MyApp.class, args);
        }
        catch (Exception e ){
            e.printStackTrace();
        }
    }

}
