import { Form, Input, Button, message } from "antd";

import styles from "./styles.module.scss";
import { LoginPropsType } from "src/types/login/login.type";
import { useGoogleLogin } from "@react-oauth/google";
import { loginGoogleAction } from "src/store/authSlice";
import { useDispatch } from "react-redux";
export function Login({ setType, onCancel }: LoginPropsType) {
  const dispatch = useDispatch();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      dispatch(
        loginGoogleAction({
          token_type: "Bearer",
          access_token: tokenResponse?.access_token,
        })
      )
        .then(() => {
          message.success("Register success !");
          onCancel();
        })
        .catch(() => {
          message.error("Register fail !");
        });
    },
  });

  return (
    <div>
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
        <a onClick={() => setType("REGISTER")}>REGISTER</a>
        <a onClick={() => setType("FORGET PASSWORD")}>FORGET PASSWORD</a>
      </div>
      <div className={styles.loginGoogle}>
        <Button onClick={() => login()}>LOG IN WITH GOOGLE</Button>
      </div>
    </div>
  );
}
