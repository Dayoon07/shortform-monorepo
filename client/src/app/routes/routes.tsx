import { RouteObject } from 'react-router-dom';
import { ROUTE, PATTERN_ROUTE } from '../../shared/constants/Route';

import HomePage from                '../../pages/HomePage/HomePage';
import LoginPlzPage from            '../../pages/user/LoginPlzPage';
import SearchPage from              '../../pages/search/SearchPage';
import ProfilePage from             '../../pages/profile/ProfilePage';
import FollowingPage from           '../../pages/follow/FollowingPage';
import SwipeVideoPage from          '../../pages/video/SwipeVideoPage';
import ExplorePage from             '../../pages/video/ExplorePage';
import UploadPage from              '../../pages/video/UploadPage';
import PostWritePage from           '../../pages/post/PostWritePage';
import LikesPage from               '../../pages/video/LikesPage';
import TagVideoPage from            '../../pages/video/TagVideoPage';
import OAuthCallbackPage from       '../../pages/user/OAuthCallbackPage';
import NotFoundWhat from            '../../pages/what/NotFoundWhat';
import ProfilePostDetailPage from   '../../pages/profile/ProfilePostDetailPage';
import EditPage from                '../../pages/video/EditPage';

export const routes: RouteObject[] = [
    { path: ROUTE.HOMEPAGE,                     element: <HomePage              /> },
    { path: ROUTE.LOGINPLZ,                     element: <LoginPlzPage          /> },
    { path: ROUTE.SEARCH,                       element: <SearchPage            /> },
    { path: ROUTE.FOLLOWING,                    element: <FollowingPage         /> },
    { path: ROUTE.EXPLORE,                      element: <ExplorePage           /> },
    { path: PATTERN_ROUTE.HASHTAG,              element: <TagVideoPage          /> },
    { path: ROUTE.STUDIO_UPLOAD,                element: <UploadPage            /> },
    { path: ROUTE.STUDIO_POST_WRITE,            element: <PostWritePage         /> },
    { path: ROUTE.LIKES,                        element: <LikesPage             /> },
    { path: PATTERN_ROUTE.PROFILE_SWIPE_VIDEO,  element: <SwipeVideoPage        /> },
    { path: ROUTE.VIDEO_EDIT,                   element: <EditPage              /> },
    { path: PATTERN_ROUTE.PROFILE,              element: <ProfilePage           /> },
    { path: PATTERN_ROUTE.PROFILE_POST_DETAIL,  element: <ProfilePostDetailPage /> },
    { path: ROUTE.OAUTH_CALLBACK,               element: <OAuthCallbackPage     /> },
    { path: PATTERN_ROUTE.WILD_CARD,            element: <NotFoundWhat          /> }
];