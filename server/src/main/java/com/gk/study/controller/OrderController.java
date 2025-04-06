package com.gk.study.controller;

import com.gk.study.common.APIResponse;
import com.gk.study.common.ResponeCode;
import com.gk.study.entity.Order;
import com.gk.study.permission.Access;
import com.gk.study.permission.AccessLevel;
import com.gk.study.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {

    private final static Logger logger = LoggerFactory.getLogger(OrderController.class);

    @Autowired
    OrderService service;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public APIResponse list(){
        List<Order> list =  service.getOrderList();
        return new APIResponse(ResponeCode.SUCCESS, "查询成功", list);
    }

    // 用户订单
    @RequestMapping(value = "/userOrderList", method = RequestMethod.GET)
    public APIResponse userOrderList(String userId, String status){
        List<Order> list =  service.getUserOrderList(userId, status);
        return new APIResponse(ResponeCode.SUCCESS, "查询成功", list);
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @Transactional
    public APIResponse create(Order order) throws IOException {
        String appointmentDateStr = order.getAppointmentDate();
        String timeSlot = order.getTimeSlot();
// 1. 解析RFC 1123日期
        DateTimeFormatter rfcFormatter = DateTimeFormatter.RFC_1123_DATE_TIME;
        // 定义日期格式，确保与传入的日期字符串格式匹配
        ZonedDateTime zonedDateTime = ZonedDateTime.parse(appointmentDateStr, rfcFormatter);

        // 2. 转换为业务时区（示例转为上海时区）
        ZonedDateTime businessZonedTime = zonedDateTime.withZoneSameInstant(ZoneId.of("Asia/Shanghai"));

        // 3. 提取本地日期
        LocalDate businessDate = businessZonedTime.toLocalDate();

        // 4. 解析时间段
        String[] timeParts = timeSlot.split("-");
        LocalTime startTime = LocalTime.parse(timeParts[0].trim());
        LocalTime endTime = LocalTime.parse(timeParts[1].trim());

        // 组合日期和时间
        LocalDateTime orderStartTime = LocalDateTime.of(businessDate, startTime);
        LocalDateTime orderEndTime = LocalDateTime.of(businessDate, endTime);

        order.setOrderStartTime(orderStartTime);
        order.setOrderEndTime(orderEndTime);
        // 增加一段预约时间的校验  判断是否有重复时间
        int result = service.checkRepeat(order.getDoctorId(),orderStartTime,orderEndTime);
        if(result > 0){
            return new APIResponse(ResponeCode.FAIL, "该医师该时间段已有预约，请选择其他时间");
        }
        service.createOrder(order);
        return new APIResponse(ResponeCode.SUCCESS, "创建成功");
    }

    @Access(level = AccessLevel.ADMIN)
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public APIResponse delete(String ids){
        System.out.println("ids===" + ids);
        // 批量删除
        String[] arr = ids.split(",");
        for (String id : arr) {
            service.deleteOrder(id);
        }
        return new APIResponse(ResponeCode.SUCCESS, "删除成功");
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @Transactional
    public APIResponse update(Order order) throws IOException {
        service.updateOrder(order);
        return new APIResponse(ResponeCode.SUCCESS, "更新成功");
    }

    @Access(level = AccessLevel.ADMIN)
    @RequestMapping(value = "/cancelOrder", method = RequestMethod.POST)
    @Transactional
    public APIResponse cancelOrder(Long id) throws IOException {
        Order order = new Order();
        order.setId(id);
        order.setStatus("7"); // 7=取消
        service.updateOrder(order);
        return new APIResponse(ResponeCode.SUCCESS, "取消成功");
    }

    @Access(level = AccessLevel.LOGIN)
    @RequestMapping(value = "/cancelUserOrder", method = RequestMethod.POST)
    @Transactional
    public APIResponse cancelUserOrder(Long id) throws IOException {
        Order order = new Order();
        order.setId(id);
        order.setStatus("7"); // 7=取消
        service.updateOrder(order);
        return new APIResponse(ResponeCode.SUCCESS, "取消成功");
    }

    private LocalTime parseTime(String timeStr) {
        if(timeStr.length() == 4) { // 处理类似"9:00"格式
            timeStr = "0" + timeStr ; // 转为"09:00"
        }
        timeStr = timeStr + ":00";
        return LocalTime.parse(timeStr, DateTimeFormatter.ofPattern("HH:mm:ss"));
    }

}
