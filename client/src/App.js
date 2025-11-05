import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppBar from "./widgets/common/AppBar/AppBar";
import SideBar from "./widgets/common/SideBar/SideBar";
import BottomNavBar from "./widgets/common/BottomNavBar/BottomNavBar";

import { ROUTE, PATTERN_ROUTE } from "./shared/constants/Route";
import { UserProvider } from "./shared/context/UserContext";

import "./App.css";

import HomePage from "./pages/HomePage/HomePage";
import LoginPlzPage from "./pages/Loginplz/LoginPlzPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import FollowerPage from "./pages/FollowerPage/FollowerPage";

export default function App() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <UserProvider>
                <div>
                    <AppBar />
                    <div style={{display: "flex"}}>
                        <SideBar />
                        <Routes>
                            <Route path={ROUTE.HOMEPAGE} element={<HomePage />} />  {/* 나중에 HomePage 컴포넌트에서 영상 가져올 떄 페이징 처리 구현 */}
                            <Route path={ROUTE.LOGINPLZ} element={<LoginPlzPage />} />
                            <Route path={ROUTE.SEARCH} element={<SearchPage />} />
                            <Route path={PATTERN_ROUTE.PROFILE} element={<ProfilePage />} />
                            <Route path={ROUTE.FOLLOWING} element={<FollowerPage />} />
                            {/*<Route path="/@:mention/video/:videoLoc" element={<VideoPage />} />
                            <Route path={ROUTE.STUDIO_UPLOAD} element={<UploadPage />} />
                            <Route path={ROUTE.LOGINPLZ} element={<LoginPlzPage />} /> */}
                        </Routes>
                    </div>
                    <BottomNavBar />
                </div>
            </UserProvider>
        </BrowserRouter>
    );
}
