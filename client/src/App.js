import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import { AppBar } from "./components/common/AppBar/AppBar";
import SideBar from "./components/common/SideBar/SideBar";
import BottomNavBar from "./components/common/BottomNavBar/BottomNavBar";
import { ROUTE } from "./shared/constants/Route";
import "./App.css";

export default function App() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <div>
                <AppBar />
                <div className="flex">
                    <SideBar user={localStorage.getItem("user")} />
                    <Routes>
                        <Route path={ROUTE.HOMEPAGE} element={<HomePage />} />
                        {/* <Route path="/search" element={<SearchPage />} />
                        <Route path="/@:mention" element={<ProfilePage />} />
                        <Route path="/@:mention/video/:videoLoc" element={<VideoPage />} />
                        <Route path={ROUTE.STUDIO_UPLOAD} element={<UploadPage />} />
                        <Route path={ROUTE.LOGINPLZ} element={<LoginPlzPage />} /> */}
                    </Routes>
                </div>
                <BottomNavBar />
            </div>
        </BrowserRouter>
    );
}
