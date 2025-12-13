import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTE, PATTERN_ROUTE } from "./shared/constants/Route";
import { UserProvider } from "./shared/context/UserContext";

import AppBar from "./widgets/common/app-bar/AppBar";
import SideBar from "./widgets/common/side-bar/SideBar";
import BottomNavBar from "./widgets/common/bottom-nav-bar/BottomNavBar";

import HomePage from "./pages/HomePage/HomePage";
import LoginPlzPage from "./pages/user/LoginPlzPage";
import SearchPage from "./pages/search/SearchPage";
import ProfilePage from "./pages/profile/ProfilePage";
import FollowingPage from "./pages/follow/FollowingPage";
import SwipeVideoPage from "./pages/video/SwipeVideoPage";
import ExplorePage from "./pages/video/ExplorePage";
import UploadPage from "./pages/video/UploadPage";
import PostWritePage from "./pages/post/PostWritePage";
import LikesPage from "./pages/video/LikesPage";
import TagVideoPage from "./pages/video/TagVideoPage";
import OAuthCallbackPage from "./pages/user/OAuthCallbackPage";
import NotFoundWhat from "./pages/what/NotFoundWhat";
import "./App.css";

export default function App() {
    return (
        <>
            <BrowserRouter basename="/shortform-client">
                <UserProvider>
                    <div>
                        <AppBar />
                        <div className="md:flex md:pl-64">
                            <SideBar />
                            <Routes>
                                <Route path={ROUTE.HOMEPAGE}                        element={<HomePage />} />
                                <Route path={ROUTE.LOGINPLZ}                        element={<LoginPlzPage />} />
                                <Route path={ROUTE.SEARCH}                          element={<SearchPage />} />
                                <Route path={ROUTE.FOLLOWING}                       element={<FollowingPage />} />
                                <Route path={ROUTE.EXPLORE}                         element={<ExplorePage />} />
                                <Route path={PATTERN_ROUTE.HASHTAG}                 element={<TagVideoPage />} />
                                <Route path={ROUTE.STUDIO_UPLOAD}                   element={<UploadPage />} />
                                <Route path={ROUTE.STUDIO_POST_WRITE}               element={<PostWritePage />} />
                                <Route path={ROUTE.LIKES}                           element={<LikesPage />} />
                                <Route path={PATTERN_ROUTE.PROFILE_SWIPE_VIDEO}     element={<SwipeVideoPage />} />
                                <Route path={PATTERN_ROUTE.PROFILE}                 element={<ProfilePage />} />
                                <Route path={ROUTE.OAUTH_CALLBACK}                  element={<OAuthCallbackPage />} />
                                <Route path={PATTERN_ROUTE.WILD_CARD}               element={<NotFoundWhat />} />
                            </Routes>
                        </div>
                        <BottomNavBar />
                    </div>
                </UserProvider>
            </BrowserRouter>
        </>
    );
}






