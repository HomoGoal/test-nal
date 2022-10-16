import { Form, Input } from "antd";
import { ResetPasswordPropsType } from "src/types/resetPassword/resetPassword.type";

import styles from "./styles.module.scss";

export function ResetPassword({
  setType,
  typeForget,
  setTypeForget,
}: ResetPasswordPropsType) {
  return (
    <div>
      {(() => {
        switch (typeForget) {
          case "first":
            return (
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
            );
          case "second":
            return (
              <Form.Item
                name="token"
                rules={[
                  { required: true, message: "Please input your token!" },
                ]}
              >
                <div>
                  <p>TOKEN</p>
                  <Input placeholder="Input token" />
                </div>
              </Form.Item>
            );
          default:
            return (
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
            );
        }
      })()}

      <div className={styles.typeWrap}>
        <a
          onClick={() => {
            setTypeForget("first");
            setType("LOG IN");
          }}
        >
          LOG IN
        </a>
        <a
          onClick={() => {
            setTypeForget("first");
            setType("REGISTER");
          }}
        >
          REGISTER
        </a>
      </div>
    </div>
  );
}
