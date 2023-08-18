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
} from "./pages";
import { Login, Register, ResetPassword } from "./pages/auth";
import {
  IndexStudy,
  IndexDocument,
  IndexExercise,
  PathDetail,
  DetailExercise,
  EditDocForm,
} from "./pages/admin";
import { RootState } from "./redux/store";
import { useSelector } from "react-redux";

function App() {
  const [userRole, setUserRole] = useState("student");
  const userID = useSelector((state: RootState) => state.auth.userID);
  const uRole = useSelector((state: RootState) => state.auth.userRole);

  useEffect(() => {
    if (userID) setUserRole(uRole);
  }, [userID, uRole]);

  return (
    <div className="app">
      {userRole === "student" && (
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Study />} />
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
            <Route path="/ex_detail/:id" element={<ExerciseDetail />} />
            <Route path="/forum/create" element={<CreateBlog />} />
            <Route path="/blog_detail/:id" element={<BlogDetail />} />
            <Route
              path="/exercise/result_detail/:id"
              element={<ResultDetail />}
            />
          </Routes>
        </BrowserRouter>
      )}
      {userRole === "admin" && (
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<IndexStudy />} />
            <Route path="/document" element={<IndexDocument />} />
            <Route path="/exercise" element={<IndexExercise />} />
            <Route path="/login" element={<Login />} />
            <Route path="/path_detail/:id" element={<PathDetail />} />
            <Route path="/exercise_detail/:id" element={<DetailExercise />} />
            <Route path="/doc_detail/:id/:type" element={<EditDocForm />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
