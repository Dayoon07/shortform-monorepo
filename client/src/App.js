import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ROUTE, PATTERN_ROUTE } from "./shared/constants/Route";
import { UserProvider } from "./shared/context/UserContext";

import "./App.css";

import AppBar from "./widgets/common/AppBar/AppBar";
import SideBar from "./widgets/common/SideBar/SideBar";
import BottomNavBar from "./widgets/common/BottomNavBar/BottomNavBar";

import HomePage from "./pages/HomePage/HomePage";
import LoginPlzPage from "./pages/Loginplz/LoginPlzPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import FollowingPage from "./pages/FollowingPage/FollowingPage";
import ProfilePostPage from "./pages/ProfilePostPage/ProfilePostPage";

export default function App() {
    return (
        <>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <UserProvider>
                    <div>
                        <AppBar />
                        <div className="sm:flex">
                            <SideBar />
                            <Routes>
                                <Route path={ROUTE.HOMEPAGE} element={<HomePage />} />  {/* 나중에 HomePage 컴포넌트에서 영상 가져올 떄 페이징 처리 구현 */}
                                <Route path={ROUTE.LOGINPLZ} element={<LoginPlzPage />} />
                                <Route path={ROUTE.SEARCH} element={<SearchPage />} />
                                <Route path={ROUTE.FOLLOWING} element={<FollowingPage />} />
                                {/* <Route path={ROUTE.EXPLORE} element={<ExplorePage />} />
                                <Route path={ROUTE.LIKES} element={<LikesPage />} />
                                <Route path={ROUTE.STUDIO_UPLOAD} element={<UploadPage />} />
                                <Route path={ROUTE.STUDIO_POST_WRITE} element={<PostWritePage />} /> */}
                                <Route path={PATTERN_ROUTE.PROFILE} element={<ProfilePage />} />
                                <Route path={PATTERN_ROUTE.PROFILE_POST} element={<ProfilePostPage />} />
                            </Routes>
                        </div>
                        <BottomNavBar />
                    </div>
                </UserProvider>
            </BrowserRouter>
        </>
    );
}
