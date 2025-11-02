import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import { AppBar } from "./widgets/common/AppBar/AppBar";
import SideBar from "./widgets/common/SideBar/SideBar";
import BottomNavBar from "./widgets/common/BottomNavBar/BottomNavBar";
import { ROUTE } from "./shared/constants/Route";
import { UserProvider } from "./shared/context/UserContext";
import "./App.css";

export default function App() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <UserProvider>
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
            </UserProvider>
        </BrowserRouter>
    );
}
