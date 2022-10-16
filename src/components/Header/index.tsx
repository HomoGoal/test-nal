import { useState } from "react";
import { ModalAuth } from "../ModalAuth";
import { useDispatch, useSelector } from "react-redux";
import { logOutAction } from "src/store/authSlice";
import { Button } from "antd";
import styles from "./styles.module.scss";
import { URL } from "src/routes/constants";

export function Header() {
  const [visible, setVisible] = useState<boolean>(false);

  const { loading, auth, user } = useSelector(
    (state: any) => state?.authReducer
  );
  const dispatch = useDispatch();

  const handleAuth = () => {
    if (auth) {
      dispatch(logOutAction());
    } else {
      setVisible(true);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href={URL}>
          BLOG-INTERVIEW TEXT
        </a>
        <div className={styles.avatarWrap}>
          {auth && (
            <img
              alt="avatar"
              src={
                user?.avatar?.url
                  ? user?.avatar?.url
                  : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIMAgwMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAwUGBAIBB//EADMQAAICAgAEBAQFAgcAAAAAAAABAgMEEQUSITETQVFxMmGBsSIzUpHBQvAjJDRicoKh/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AP3EAAADzOcYRcpySiu7YHo8znGC3OSivVvRVZfFn1jir/vJfZFZZZO2XNbNyfq2BfWcTxa+nO5P/atkEuM1L4apv30UvQlrxrrluqty9mgLNcar31pn+5LDi+NL4uePuioniZFa3OiaXtshA1FWRTd+VZGXyT6kpkl0e13R243Er6dKb8SHpLv+4GgBBi5dOTHdcuq7xfdE4AAAAAAAPNkowg5SeopbbA8ZF8Met2WPSX7tmfy8yzKnuXSC+GK8hm5Usq3mfSC+GPoc4AmxsW3Kny1rou8n2RCaPhtPg4kF5yXM/qB8xMGvHgtqM5fqcep1JJdkfQAIbcWi1PxKovffoTADP8QwHi/jg91N+fdHEauyuNsHCa3F90Zi+t03zrf9MmgPMJyrmpwk4yXZovOHZ6yEq7NRtS+kvYoT6m4tSi2pJ7TXkBrAcfDsxZVXX8yPSS9fmdgAAACo41k9Vjx95/wi1nJQhKT7RW2Ze2x22ysl3k9geAAAZqcd81FbXnFfYyxo+GS58Gp+i1+zA6gAAAAAznFP9fbr5fZGjMxmS5su5+s2BCAAJsTIljXxsj27SXqjTRkpRUovaa2mZMveDXeJjODfWt6+nkBYAADj4tZyYM9d5aiZ4uuOy1RVH1n/AAUoAAAe6oeLdXXvXNJLZo8ShY1KqUnJJ7TZmoycJxlHvF7RqabFbVCyPaS2B7AAAAAfGUHEcNYrg1Nyc972jQFDxi7xMrkXata+oHAAABYcEs5ctw8px+39srzp4a+XOpfrLQGkAAFVx5PwqX5czKcveNw5sPm/TJMogAAAFnwvP8NQxpx2nLUX6bKw+puMlJd09oDWAjosVtUbI9pLZIAAAHJn5ixIxfI5uW9JMz05Oc3OXeT22dvGLVZlcifSta+vmcIAAADo4f1zaf8Akc52cIhzZ0X+lNgaEAARZVfjY9lfnKPT38jMaa6PujWGf4tj+DlOUV+CzqvfzA4gAAAJsXHnk2qFa95egFnwKcnTZFv8MZLRaEONj140OSpaT6t+pMAPFzcaZyj8Si2vc9nxraafZgZTbk229t9dnwseJ4CoStoj/h6/Eu/L8yuAAAAW/AqtKy5+f4Y/yVUIuc4xityk9JGmxqVRRCpf0rv6sCUAACDNx45NEq30feL9GTgDMRxr5TlCNU3JPT6djqq4TkT+Nxgvm9v/AMLzR9ArauEUR62SnN++kd1NNdMeWqCiu/QkAAAAAAAa33OK3hmLPtDkfrF6O0AU1vB5r8q1P5SWjktwcmr4qZNeseppABUcHw2v8xYvlBP7luAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/2Q=="
              }
            />
          )}
          <Button
            onClick={handleAuth}
            className="btn btn-primary"
            loading={loading}
          >
            {auth ? "LOG OUT" : "LOG IN"}
          </Button>
        </div>
      </div>
      {visible && (
        <ModalAuth visible={visible} onCancel={() => setVisible(false)} />
      )}
    </nav>
  );
}
