import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
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
  GoHomeResult,
  TestLevelUp,
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
  EditSentenceDocForm,
  ManageOnboarding,
  ManageTestUpdateLevel,
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

  const navigate = useNavigate();

  useEffect(() => {
    if (userID) setUserRole(uRole);
    if (localStorage.getItem("theme") !== null) {
      setTheme(localStorage.getItem("theme"));
    }

    if (!!userID) {
      if (userRole === "admin") navigate("/dashboard");
      else navigate("/study");
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
              "--header-color": DarkTheme.headerColor,
            }
          : {}
      }
    >
      <ToastContainer />
      {userRole === "student" && (
        <>
          <Header />
          <Routes>
            <Route path="" element={<Login />} />
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
            <Route path="/go_home/:id/result" element={<GoHomeResult />} />
            <Route path="/test_level_up" element={<TestLevelUp />} />
          </Routes>
        </>
      )}
      {userRole === "admin" && (
        <>
          <Header />
          <Routes>
            <Route path="" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/study" element={<IndexStudy />} />
            <Route path="/document" element={<IndexDocument />} />
            <Route path="/exercise" element={<IndexExercise />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/path_detail/:id" element={<PathDetail />} />
            <Route path="/exercise_detail/:id" element={<DetailExercise />} />
            <Route path="/doc_detail/:id/0" element={<EditDocForm />} />
            <Route path="/doc_detail/:id/1" element={<EditSentenceDocForm />} />
            <Route path="/forum" element={<IndexForum />} />
            <Route path="/blog_detail/:id" element={<BlogDetail />} />
            <Route
              path="/pending_blog_detail/:id"
              element={<DetailPendingBlog />}
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/manage_users" element={<ManageUser />} />
            <Route path="/manage_onboarding" element={<ManageOnboarding />} />
            <Route
              path="/manage_test_update_level"
              element={<ManageTestUpdateLevel />}
            />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
