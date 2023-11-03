import { FC, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import TagPosts from "../tagPosts/TagPosts";
import CheckAdminRole from "./CheckAdminRole";

const Home = lazy(() => import("../../pages/home/Home"));
const Quiz = lazy(() => import("../../pages/quizPlay/QuizPlay"));
const Login = lazy(() => import("../../pages/login/Login"));
const Register = lazy(() => import("../../pages/register/Register"));
const NotFound = lazy(() => import("../../pages/404/NotFound"));
const CreatePost = lazy(() => import("../../pages/createPost/CreatePost"));
const Profile = lazy(() => import("../../pages/profile/Profile"));
const Post = lazy(() => import("../../pages/post/Post"));
const About = lazy(() => import("../../pages/about/About"));
const Videos = lazy(() => import("../../pages/videos/Videos"));
const Contact = lazy(() => import("../../pages/contact/Contact"));
const UserList = lazy(() => import("../../pages/userlist/UserList"));
const CreateUser = lazy(() => import("../../pages/createUser/CreateUser"));


const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"/"}>
        <Route index element={<Home />} />
        <Route path={"quiz"} element={<Quiz />} />
        <Route path={"login"} element={<Login />} />
        <Route path={"register"} element={<Register />} />
        <Route path={"about"} element={<About />} />
        <Route path={"videos"} element={<Videos />} />
        <Route path={"contact"} element={<Contact />} />
        <Route path={'t/:tagId'} element={<TagPosts/>}/>
        <Route element={<RequireAuth />}>
          <Route path={"posts/:postId"} element={<Post />} />
          <Route path={"profile"} element={<Profile />} />
        </Route>
        <Route element={<CheckAdminRole/>}>
          <Route path={"create"} element={<CreatePost />} />
          <Route path={'edit/:postId'} element={<CreatePost/>}/>
          <Route path={'users'} element={<UserList/>}/>
          <Route path={"users/create"} element={<CreateUser />} />
          <Route path={"users/edit/:userId"} element={<CreateUser />} />
        </Route>
        <Route path={"*"} element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
