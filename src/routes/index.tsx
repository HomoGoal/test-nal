import { useEffect, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DetailBlog } from "../components/DetailBlog";
import { Router } from "./constants";
import webStorage from "src/helpers/webStorage";
import { useSelector, useDispatch } from "react-redux";
import {
  getMeAction,
  resetFirst,
  refreshTokenAction,
} from "src/store/authSlice";
import { REFRESH_TOKEN } from "src/constants/configs";

const Header = lazy(() => import("../components/Header"));
const Home = lazy(() => import("../components/Home"));

export function RouterLink() {
  const dispatch = useDispatch();

  const { first, auth } = useSelector((state: any) => state.authReducer);

  useEffect(() => {
    if (first) {
      const accessToken = webStorage.getToken();
      if (accessToken) {
        dispatch(getMeAction());
      } else {
        dispatch(resetFirst({}));
      }
    }
  }, [dispatch, first]);

  useEffect(() => {
    if (auth) {
      const accessToken = webStorage.get(REFRESH_TOKEN);
      if (accessToken) {
        setTimeout(() => {
          dispatch(refreshTokenAction({ token: accessToken }));
        }, 900000);
      }
    }
  }, [auth]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={Router.Home} element={<Home />} />
        <Route path={Router.Detail} element={<DetailBlog />} />
      </Routes>
    </BrowserRouter>
  );
}
