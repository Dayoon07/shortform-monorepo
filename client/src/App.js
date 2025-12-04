import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTE, PATTERN_ROUTE } from "./shared/constants/Route";
import { UserProvider } from "./shared/context/UserContext";

import AppBar from "./widgets/common/app-bar/AppBar";
import SideBar from "./widgets/common/side-bar/SideBar";
import BottomNavBar from "./widgets/common/bottom-nav-bar/BottomNavBar";

import HomePage from "./pages/HomePage/HomePage";
import LoginPlzPage from "./pages/Loginplz/LoginPlzPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import FollowingPage from "./pages/FollowingPage/FollowingPage";
import ProfilePostPage from "./pages/ProfilePostPage/ProfilePostPage";
import SwipeVideoPage from "./pages/SwipeVideoPage/SwipeVideoPage";
import ExplorePage from "./pages/ExplorePage/ExplorePage";
import UploadPage from "./pages/UploadPage/UploadPage";
import PostWritePage from "./pages/PostWritePage/PostWritePage";
import LikesPage from "./pages/LikesPage/LikesPage";
import TagVideoPage from "./pages/TagVideoPage/TagVideoPage";
import OAuthCallbackPage from "./pages/OAuthCallbackPage/OAuthCallbackPage";
import "./App.css";

export default function App() {
  return (
    <>
      <BrowserRouter basename="/shortform-client">
        <UserProvider>
          <div>
            <AppBar />
            <div className="sm:flex">
              <SideBar />
              <Routes>
                  <Route path={ROUTE.HOMEPAGE}                    element={<HomePage />} />
                  <Route path={ROUTE.LOGINPLZ}                    element={<LoginPlzPage />} />
                  <Route path={ROUTE.SEARCH}                      element={<SearchPage />} />
                  <Route path={ROUTE.FOLLOWING}                   element={<FollowingPage />} />
                  <Route path={ROUTE.EXPLORE}                     element={<ExplorePage />} />
                  <Route path={PATTERN_ROUTE.HASHTAG}             element={<TagVideoPage />} />
                  <Route path={ROUTE.STUDIO_UPLOAD}               element={<UploadPage />} />
                  <Route path={ROUTE.STUDIO_POST_WRITE}           element={<PostWritePage />} />
                  <Route path={ROUTE.LIKES}                       element={<LikesPage />} />
                  <Route path={PATTERN_ROUTE.PROFILE_SWIPE_VIDEO} element={<SwipeVideoPage />} />
                  <Route path={PATTERN_ROUTE.PROFILE}             element={<ProfilePage />} />
                  <Route path={PATTERN_ROUTE.PROFILE_POST}        element={<ProfilePostPage />} />
                  <Route path={ROUTE.OAUTH_CALLBACK}              element={<OAuthCallbackPage />} />
              </Routes>
            </div>
            <BottomNavBar />
          </div>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}






