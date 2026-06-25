package com.e.shortform.domain.report.mapper;

import com.e.shortform.domain.report.res.ReportAdminDto;
import com.e.shortform.domain.report.vo.ReportVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ReportMapper {

    List<ReportVo> getReportAll();

    // 관리자 화면: 신고자/피신고자 이름 포함, status 필터 선택
    List<ReportAdminDto> selectReportsForAdmin(@Param("status") String status);

}
