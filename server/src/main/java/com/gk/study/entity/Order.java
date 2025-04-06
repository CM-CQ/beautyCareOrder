package com.gk.study.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@TableName("b_order")
public class Order implements Serializable {
    @TableId(value = "id",type = IdType.AUTO)
    public Long id;
    @TableField
    public Long doctorId;  //本次新增医生id
    @TableField
    public String status;
    @TableField
    public LocalDateTime  orderStartTime; //预约开始时间
    @TableField
    public LocalDateTime orderEndTime; //预约结束时间
    @TableField
    public String orderTime;
    @TableField
    public String payTime;
    @TableField
    public String thingId;
    @TableField
    public String userId; // 用户id
    @TableField
    public String count;
    @TableField
    public String orderNumber; // 订单编号
    @TableField
    public String receiverAddress;
    @TableField
    public String receiverName;
    @TableField
    public String receiverPhone;
    @TableField
    public String remark;

    @TableField(exist = false)
    public String username; // 用户名
    @TableField(exist = false)
    public String appointmentDate; // 预约日期
    @TableField(exist = false)
    public String timeSlot ; // 预约时间段
    @TableField(exist = false)
    public String title; // 商品名称
    @TableField(exist = false)
    public String cover; // 商品封面
    @TableField(exist = false)
    public String price; // 商品价格

}
