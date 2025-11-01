import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SideBar from "./components/common/SideBar";
import BottomNavBar from "./components/common/BottomNavBar";
import { ROUTE } from "./constrants/Route";
import "./App.css";
import { AppBar } from "./components/common/AppBar";

export default function App() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <div>
                <AppBar />
                <div className="flex">
                    <SideBar />
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
