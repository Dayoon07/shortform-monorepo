package com.e.shortform.domain.comment.controller;

import com.e.shortform.common.annotation.RequireAuth;
import com.e.shortform.domain.comment.entity.CommentLikeEntity;
import com.e.shortform.domain.comment.entity.CommentReplyEntity;
import com.e.shortform.domain.comment.req.CommentReplyReqDto;
import com.e.shortform.domain.comment.req.CommentReqDto;
import com.e.shortform.domain.comment.res.CommentButVideoRes;
import com.e.shortform.domain.comment.res.CommentReply;
import com.e.shortform.domain.comment.service.CommentLikeService;
import com.e.shortform.domain.comment.service.CommentReplyService;
import com.e.shortform.domain.comment.service.CommentService;
import com.e.shortform.domain.community.service.CommunityAdditionService;
import com.e.shortform.domain.community.service.CommunityLikeService;
import com.e.shortform.domain.community.service.CommunityService;
import com.e.shortform.domain.report.service.ReportService;
import com.e.shortform.domain.search.service.SearchListService;
import com.e.shortform.domain.user.entity.UserEntity;
import com.e.shortform.domain.user.req.AuthUserReqDto;
import com.e.shortform.domain.follow.service.FollowService;
import com.e.shortform.domain.user.service.UserService;
import com.e.shortform.domain.video.service.VideoLikeService;
import com.e.shortform.domain.video.service.VideoService;
import com.e.shortform.domain.viewstory.service.ViewStoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RequestMapping(value = "/api/comment", produces = "application/json;charset=utf-8")
@RestController
public class RestCommentController {

    private final UserService userService;
    private final VideoService videoService;
    private final FollowService followService;
    private final CommentService commentService;
    private final VideoLikeService videoLikeService;
    private final SearchListService searchListService;
    private final ViewStoryService viewStoryService;
    private final CommentLikeService commentLikeService;
    private final CommentReplyService commentReplyService;
    private final CommunityService communityService;
    private final CommunityAdditionService communityAdditionService;
    private final CommunityLikeService communityLikeService;
    private final ReportService reportService;

    @RequireAuth
    @PostMapping("/insert")
    public ResponseEntity<?> insertComment(
            @RequestBody CommentReqDto req,
            @AuthenticationPrincipal UserEntity user
    ) {
        Map<String, Object> res = commentService.videoInsertComment(
                req.getCommentText(),
                user.getId(),
                req.getCommentVideoId());
        return ResponseEntity.ok(res);
    }

    @GetMapping("/all")
    public List<?> selectAllComments() {
        return commentService.selectAllComments();
    }

    @GetMapping("/popular")
    public ResponseEntity<List<CommentButVideoRes>> findVideoComment(@RequestParam Long id) {
        return ResponseEntity.ok(commentService.selectByCommentId(id));
    }

    @GetMapping("/recent")
    public ResponseEntity<?> findVideoCommentRecent(@RequestParam Long id) {
        return ResponseEntity.ok(commentService.selectByCommentButOrderByIsDesc(id));
    }

    @RequireAuth
    @PostMapping("/update")
    public ResponseEntity<?> updateComment(
            @RequestParam Long commentId,
            @RequestParam String comment,
            @AuthenticationPrincipal UserEntity user) {
        commentService.updateComment(commentId, comment, user);
        return ResponseEntity.ok(true);
    }

    @RequireAuth
    @PostMapping("/delete")
    public ResponseEntity<?> deleteComment(
            @RequestParam Long commentId,
            @AuthenticationPrincipal UserEntity user) {
        commentService.deleteComment(commentId, user);
        return ResponseEntity.ok(true);
    }

}
