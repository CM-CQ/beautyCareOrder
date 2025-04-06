package com.gk.study.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.gk.study.entity.Order;
import org.apache.ibatis.annotations.Mapper;

import java.time.LocalDateTime;
import java.util.List;

@Mapper
public interface OrderMapper extends BaseMapper<Order> {

    int getRepeat(Long doctorId, LocalDateTime orderStartTime, LocalDateTime orderEndTime);

    List<Order> getList();

    List<Order> getUserOrderList(String userId, String status);
}
