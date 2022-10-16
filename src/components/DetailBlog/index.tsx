import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.scss";
import { Input, Form, Button } from "antd";
import { useParams } from "react-router-dom";
import { getDetailBlog } from "src/store/blogSlice";
import { createCommentAction, getListComment } from "src/store/commentSlice";

export function DetailBlog() {
  const dispatch = useDispatch();

  const params = useParams();
  console.log(params);

  let { id } = useParams();

  const { loading, detailBlog } = useSelector(
    (state: any) => state.blogReducer
  );

  const { auth } = useSelector((state: any) => state.authReducer);

  useEffect(() => {
    dispatch(getDetailBlog(id));
    dispatch(getListComment({ id }));
  }, [id]);

  const onFinish = (value: any) => {
    const data = { "comment[content]": value?.comment };
    dispatch(createCommentAction({ id, data }));
  };
  // ádfadfasd
  return (
    <div className={styles.detailBlogContainer}>
      <div className={styles.detailBlogWrap}>
        <h1>{detailBlog?.data?.title}</h1>
        <h6>{detailBlog?.data?.created_at}</h6>
        <img src={detailBlog?.data?.image?.url} alt="loading" />
        <p>{detailBlog?.data?.content}</p>
      </div>
      <Form
        className={styles.writeCommentArea}
        onFinish={onFinish}
        disabled={!auth}
      >
        <Form.Item
          name="comment"
          rules={[{ required: true, message: "Please input your comment!" }]}
        >
          <Input
            placeholder={auth ? "Input your comment" : "Please Log in first !"}
          />
        </Form.Item>
        <Button htmlType="submit">Comment</Button>
      </Form>
      <ul className={styles.commentList}></ul>
    </div>
  );
}
