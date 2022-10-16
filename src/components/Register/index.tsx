import { Form, Input, Upload } from "antd";
import React, { FC, useState } from "react";
import { RegisterPropsType } from "src/types/register/register.type";
import { getBase64 } from "../../helpers/getBase64";
import styles from "./styles.module.scss";

const Register = ({ setType, form }: RegisterPropsType) => {
  const [img, setImg] = useState();

  const handleChangeAvatar = (file: any) => {
    getBase64(file?.file?.originFileObj, (img: any) => setImg(img));
    form.setFieldsValue({ img: file?.file?.originFileObj });
  };

  return (
    <div>
      <Form.Item name="img">
        <Upload onChange={handleChangeAvatar} showUploadList={false}>
          <img
            alt="avatar"
            className={styles.avatarShow}
            src={
              img
                ? img
                : "https://media.istockphoto.com/vectors/avatar-5-vector-id1131164548?k=20&m=1131164548&s=612x612&w=0&h=ODVFrdVqpWMNA1_uAHX_WJu2Xj3HLikEnbof6M_lccA="
            }
          ></img>
        </Upload>
      </Form.Item>

      <Form.Item
        name="name"
        rules={[
          { required: true, message: "Please input your name!" },
          { max: 50, message: "Within 50 characters" },
        ]}
      >
        <div>
          <p>Name</p>
          <Input placeholder="Input name" />
        </div>
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "Invalid email" },
        ]}
      >
        <div>
          <p>Email</p>
          <Input placeholder="Input email" />
        </div>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: "Please input your password!" },
          { min: 8, message: "At least 6 characters" },
        ]}
      >
        <div>
          <p>Password</p>
          <Input.Password placeholder="Input password" />
        </div>
      </Form.Item>
      <div className={styles.typeWrap}>
        <a onClick={() => setType("LOG IN")}>LOG IN</a>
      </div>
    </div>
  );
};

export default Register;
