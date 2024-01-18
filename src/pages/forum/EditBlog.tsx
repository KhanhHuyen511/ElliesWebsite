import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import classNames from "classnames/bind";
import style from "./CreateBlog.module.scss";
import { Button, Input } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getABlog, setABlog, updateABlog } from "../../redux/slice/forumSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Blog, BlogState } from "../../types";
import React from "react";
import { useForm } from "react-hook-form";
const cx = classNames.bind(style);

const EditBlog = () => {
  const { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [data, setData] = useState<Blog>();

  const { register, handleSubmit, reset, getValues, setValue, watch } = useForm(
    {
      defaultValues: {
        title: "",
        content: "",
        keyword: "",
        summary: "",
      },
    }
  );
  const fetchData = async (id: string) => {
    const { payload } = await dispatch(getABlog(id));
    setData(payload as Blog);
    const newData = payload as Blog;

    setValue("title", newData.title);
    setValue("content", newData.content);
    setValue("keyword", newData.keyword ? newData.keyword : "");
    setValue("summary", newData.summary ? newData.summary : "");
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [dispatch, id]);

  const onCancel = () => {
    id && fetchData(id);

    navigate(-1);
  };

  const onSubmit = async () => {
    if (data) {
      await dispatch(
        updateABlog({
          newData: {
            ...data,
            title: getValues("title"),
            keyword: getValues("keyword"),
            summary: getValues("summary"),
            content: getValues("content"),
          },
        })
      );

      navigate(-1);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container">
      <p className={cx("page-title")}>Edit blog</p>
      <Input
        label="Title"
        placeholder="fill in title"
        register={register("title")}
      />
      <Input
        label="Keyword"
        placeholder="fill in keyword"
        register={register("keyword")}
      />
      <Input
        label="Brief"
        placeholder="fill im brief"
        register={register("summary")}
      />
      <div className={cx("text-editor")}>
        <p className={cx("text-editor-label")}>Content</p>
        <ReactQuill
          theme="snow"
          value={getValues("content")}
          placeholder="fill in content"
          onChange={(content, delta, source, editor) => {
            setValue("content", content);
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
        <Button type="submit" isPrimary={true} className={cx("submit")}>
          Save
        </Button>
        <Button
          type="button"
          isPrimary={false}
          onClick={onCancel}
          preventDefault
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EditBlog;
