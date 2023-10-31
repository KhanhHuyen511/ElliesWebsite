import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./components";
import {
  Study,
  Document,
  Exercise,
  Profile,
  Forum,
  StudyDetail,
  DocDetail,
  ExerciseDetail,
  CreateBlog,
  BlogDetail,
  ResultDetail,
  Onboarding,
  SavedPage,
  StudentDashboard,
  Leaderboard,
  GoHome,
  GoHomeDetail,
  GoHomeStart,
} from "./pages";
import { Login, Register, ResetPassword } from "./pages/auth";
import {
  IndexStudy,
  IndexDocument,
  IndexExercise,
  PathDetail,
  DetailExercise,
  EditDocForm,
  IndexForum,
  DetailPendingBlog,
  Dashboard,
  ManageUser,
} from "./pages/admin";
import { RootState } from "./redux/store";
import { useSelector } from "react-redux";
import { DarkTheme } from "./theme/themes";
import IndexPage from "./pages/game/IndexPage";
import { ToastContainer } from "react-toastify";

function App() {
  const [userRole, setUserRole] = useState("student");
  const userID = useSelector((state: RootState) => state.auth.userID);
  const uRole = useSelector((state: RootState) => state.auth.userRole);
  const [theme, setTheme] = useState<string | null>("light");

  useEffect(() => {
    if (userID) setUserRole(uRole);
    if (localStorage.getItem("theme") !== null) {
      setTheme(localStorage.getItem("theme"));
    }
  }, [userID, uRole, theme]);

  return (
    <div
      className="app"
      style={
        theme === "dark"
          ? {
              "--bg-color": DarkTheme.backgroundColor,
              "--text-color": DarkTheme.color,
              "--text-m-color": DarkTheme.textMediumColor,
              "--text-l-color": DarkTheme.textLightColor,
              "--text-G050-color": DarkTheme.textG050Color,
              "--text-b-color": DarkTheme.textBoldColor,
              "--bg-m-color": DarkTheme.bgMediumColor,
              "--bg-b-color": DarkTheme.bgBoldColor,
              "--bg-card-light": DarkTheme.bgCardLight,
              "--bg-save-light": DarkTheme.bgSaveLight,
              "--bg-G050-color": DarkTheme.bgG050Color,
              "--icon-m-color": DarkTheme.iconMediumColor,
            }
          : {}
      }
    >
      <ToastContainer />
      {userRole === "student" && (
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Study />} />
            <Route path="/study" element={<Study />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/document" element={<Document />} />
            <Route path="/exercise" element={<Exercise />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/saved" element={<SavedPage />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/study_detail/:id" element={<StudyDetail />} />
            <Route path="/doc_detail/:id/:type" element={<DocDetail />} />
            <Route
              path="/ex_detail/:id/:is_again"
              element={<ExerciseDetail />}
            />
            <Route path="/forum/create" element={<CreateBlog />} />
            <Route path="/blog_detail/:id" element={<BlogDetail />} />
            <Route
              path="/exercise/result_detail/:id"
              element={<ResultDetail />}
            />
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/game" element={<IndexPage />} />
            <Route path="/go_home" element={<GoHome />} />
            <Route path="/go_home/:id" element={<GoHomeDetail />} />
            <Route path="/go_home/:id/start" element={<GoHomeStart />} />
          </Routes>
        </BrowserRouter>
      )}
      {userRole === "admin" && (
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/study" element={<IndexStudy />} />
            <Route path="/document" element={<IndexDocument />} />
            <Route path="/exercise" element={<IndexExercise />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/path_detail/:id" element={<PathDetail />} />
            <Route path="/exercise_detail/:id" element={<DetailExercise />} />
            <Route path="/doc_detail/:id/:type" element={<EditDocForm />} />
            <Route path="/forum" element={<IndexForum />} />
            <Route path="/blog_detail/:id" element={<BlogDetail />} />
            <Route
              path="/pending_blog_detail/:id"
              element={<DetailPendingBlog />}
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/manage_users" element={<ManageUser />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
