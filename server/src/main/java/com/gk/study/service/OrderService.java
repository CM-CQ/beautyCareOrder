package com.gk.study.service;


import com.gk.study.entity.Order;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderService {
    int checkRepeat(Long doctorId, LocalDateTime orderStartTime, LocalDateTime orderEndTime);
    List<Order> getOrderList();
    void createOrder(Order order);
    void deleteOrder(String id);

    void updateOrder(Order order);

    List<Order> getUserOrderList(String userId, String status);
}
