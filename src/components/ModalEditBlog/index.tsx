import { Button, Form, Modal, message, Input, Upload } from "antd";
import { useState, useEffect } from "react";

import { getBase64 } from "src/helpers/getBase64";
import { updateBlog } from "src/services/apis/blog/blog";
import {
  ModalEditPropsType,
  OnFinishType,
} from "src/types/modalEditBlog/modalEditBlog.type";

import styles from "./styles.module.scss";

export function ModalEditBlog({
  visible,
  onCancel,
  data,
  reload,
}: ModalEditPropsType) {
  const [img, setImg] = useState<string>();
  const [imgChange, setImgChange] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [form] = Form.useForm();

  useEffect(() => {
    if (data) {
      setImg(data?.image?.url);
      form.setFieldsValue({
        title: data?.title,
        content: data?.content,
      });
    }
  }, [data]);

  const onFinish = async (values: OnFinishType) => {
    setLoading(true);
    const dataSubmit = new FormData();
    dataSubmit.append("blog[title]", values?.title);
    dataSubmit.append("blog[content]", values?.content);
    if (imgChange) {
      dataSubmit.append("blog[image]", values?.img);
    }

    updateBlog({ id: data?.id, data: dataSubmit })
      .then(() => {
        onCancel();
        setLoading(false);
        message.success("Update Success !");
        reload();
      })
      .catch(() => {
        setLoading(false);
        message.error("Update Fail !");
      });
  };

  const handleChangeAvatar = (file: any) => {
    getBase64(file?.file?.originFileObj, (img: any) => setImg(img));
    form.setFieldsValue({ img: file?.file?.originFileObj });
    setImgChange(true);
  };
  return (
    <Modal
      className={styles.modal}
      visible={visible}
      onCancel={onCancel}
      title="EDIT BLOG"
    >
      <Form onFinish={onFinish} form={form}>
        <Form.Item name="img">
          <Upload
            onChange={handleChangeAvatar}
            showUploadList={false}
            className={styles.uploadWrap}
          >
            {img ? (
              <img alt="avatar" className={styles.imageShow} src={img}></img>
            ) : (
              <p className={styles.addImage}>Add Image</p>
            )}
          </Upload>
        </Form.Item>
        <Form.Item
          name="title"
          rules={[{ required: true, message: "Please input your title!" }]}
        >
          <div>
            <p>Title</p>
            <Input
              disabled={loading}
              value={Form.useWatch("title", form)}
              placeholder="Input title"
            />
          </div>
        </Form.Item>
        <Form.Item
          name="content"
          rules={[{ required: true, message: "Please input your content!" }]}
        >
          <div>
            <p>Content</p>
            <Input
              disabled={loading}
              value={Form.useWatch("content", form)}
              placeholder="Input content"
            />
          </div>
        </Form.Item>
        <div className={styles.groupButton}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button htmlType="submit" loading={loading}>
            OK
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
