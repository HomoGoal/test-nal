import { Button, Form, Modal, message } from "antd";
import { useState } from "react";

import { Login } from "../Login";
import Register from "../Register";
import { ResetPassword } from "../ResetPassword";
import { loginAction } from "src/store/authSlice";
import { register } from "src/services/apis/auth";
import {
  forgotPassword,
  verifyToken,
  resetPassword,
} from "src/services/apis/password";

import { useDispatch, useSelector } from "react-redux";

import styles from "./styles.module.scss";
import { ModalAuthPropsType } from "src/types/modalAuth/login.type";

export function ModalAuth({ visible, onCancel }: ModalAuthPropsType) {
  const [type, setType] = useState<string>("LOG IN");
  const [typeForget, setTypeForget] = useState<string>("first");
  const [loadingForm, setLoadingForm] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");

  const dispatch = useDispatch();

  const { loading } = useSelector((state: any) => state?.authReducer);

  const onFinish = async (values: any) => {
    if (type === "LOG IN") {
      const data = { ...values, remember_me: true };
      dispatch(loginAction(data)).then(() => onCancel());
    } else if (type === "REGISTER") {
      const data = new FormData();
      data.append("user[name]", values?.name);
      data.append("user[email]", values?.email);
      data.append("user[password]", `${values?.password}`);
      data.append("user[avatar]", values?.img);
      setLoadingForm(true);

      await register(data)
        .then(() => {
          setType("LOG IN");
          message.success("Register success !");
          setLoadingForm(false);
          form.setFieldsValue({
            name: null,
            email: null,
            password: null,
            avatar: null,
          });
        })
        .catch(() => {
          setLoadingForm(false);
          message.error("Register fail !");
        });
    } else {
      setLoadingForm(true);
      if (typeForget === "first") {
        const data = {
          email: values?.email,
          reset_password_url: "http://your-domain.com/reset_password",
        };
        forgotPassword(data)
          .then(() => {
            setLoadingForm(false);
            setTypeForget("second");
          })
          .catch(() => setLoadingForm(false));
      } else if (typeForget === "second") {
        const data = {
          token: values?.token,
        };
        verifyToken(data)
          .then(() => {
            setToken(values?.token);
            setLoadingForm(false);
            setTypeForget("last");
            message.success("Veryfi token success !");
          })
          .catch(() => {
            message.error("Veryfi token fail !");
            setLoadingForm(false);
          });
      } else {
        const data = {
          token,
          password: values?.password,
        };
        resetPassword(data)
          .then(() => {
            setToken("");
            setLoadingForm(false);
            setTypeForget("first");
            setType("LOG IN");
            message.success("Reset password success !");
          })
          .catch(() => {
            setLoadingForm(false);
            message.error("Reset password fail !");
          });
      }
    }
  };

  const [form] = Form.useForm();

  return (
    <Modal
      className={styles.modal}
      visible={visible}
      onCancel={onCancel}
      title={type}
    >
      <Form onFinish={onFinish} form={form}>
        {(() => {
          switch (type) {
            case "LOG IN":
              return <Login setType={setType} onCancel={onCancel}></Login>;
            case "REGISTER":
              return <Register setType={setType} form={form} />;
            default:
              return (
                <ResetPassword
                  setType={setType}
                  typeForget={typeForget}
                  setTypeForget={setTypeForget}
                />
              );
          }
        })()}
        <div className={styles.groupButton}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button htmlType="submit" loading={loadingForm || loading}>
            OK
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
