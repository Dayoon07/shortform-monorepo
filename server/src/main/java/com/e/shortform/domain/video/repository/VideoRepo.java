package com.e.shortform.domain.video.repository;


import com.e.shortform.domain.video.entity.VideoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VideoRepo extends JpaRepository<VideoEntity, Long> {
    VideoEntity findByVideoLoc(String videoLoc);

    // 업로더(LAZY)를 함께 로딩 — open-in-view=false 환경에서 직렬화 시 LazyInitializationException 방지
    @Query("SELECT v FROM VideoEntity v JOIN FETCH v.uploader WHERE v.id = :id")
    Optional<VideoEntity> findByIdWithUploader(@Param("id") Long id);
}
