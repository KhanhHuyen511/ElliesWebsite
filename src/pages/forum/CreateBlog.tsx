import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import classNames from "classnames/bind";
import style from "./CreateBlog.module.scss";
import { Button, Input } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { setABlog } from "../../redux/slice/forumSlice";
import { useNavigate } from "react-router-dom";
import { BlogState } from "../../types";
const cx = classNames.bind(style);

const CreateBlog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const userID = useSelector((state: RootState) => state.auth.userID);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [keyword, setKeyword] = useState("");
  const [summary, setSummary] = useState("");

  return (
    <>
      <div className="container">
        <p className={cx("page-title")}>Add new blog</p>
        <Input
          label="Title"
          placeholder="fill in title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <Input
          label="Keyword"
          placeholder="fill in keyword"
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        <Input
          label="Brief"
          placeholder="fill im brief"
          onChange={(e) => {
            setSummary(e.target.value);
          }}
        />
        <div className={cx("text-editor")}>
          <p className={cx("text-editor-label")}>Content</p>
          <ReactQuill
            theme="snow"
            value={content}
            placeholder="fill in content"
            onChange={(content, delta, source, editor) => {
              setContent(content);
            }}
            modules={{
              toolbar: {
                container: [
                  [{ header: [1, 2, 3, 4, 5, 6, false] }],
                  ["bold", "italic", "underline"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  [{ align: [] }],
                  ["link", "image"],
                  ["clean"],
                  [{ color: [] }],
                ],
                handlers: {
                  // image: this.imageHandler
                },
              },
              // table: true,
            }}
          />
        </div>
        {/* <div
          dangerouslySetInnerHTML={{
            __html: 'hi',
          }}
        ></div> */}
        <div className={cx("cta")}>
          <Button
            isPrimary={true}
            onClick={() => {
              if (userID)
                dispatch(
                  setABlog({
                    userId: userID,
                    content: content,
                    summary: summary,
                    id: "",
                    type: "blog",
                    title: title,
                    keyword: keyword,
                    createDate: new Date(),
                    state: BlogState.Pending,
                  })
                ).then(() => navigate(-1));
            }}
            className={cx("submit")}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
