import React from "react";
import axios from "axios";
import queryString from "query-string";
// import { toast } from 'react-toastify';

import { API_SERVER } from "../constants/configs";
import webStorage from "../helpers/webStorage";

const baseApiConfig: any = {
  baseURL: API_SERVER,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000, // 60s
  paramsSerializer: (params: object) => queryString.stringify(params),
};

const SESSION_EXPIRED_STATUS_CODE = 401;

const baseApiClient = axios.create(baseApiConfig);

const request = ({
  enableFlashMessageError = true,
  enableFlashMessageSuccess = false,
  isAuth = true,
  ...options
}) => {
  if (isAuth) {
    const accessToken = webStorage.getToken();
    baseApiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }

  const onSuccess = (response: any) => {
    // if (enableFlashMessageSuccess && response?.data?.message)
    //   toast(<ToastMessage type="success" message={response.data.message} />);
    return response;
  };

  const onError = (error: any) => {
    return Promise.reject(error.response);
  };

  return baseApiClient(options).then(onSuccess).catch(onError);
};

export default request;
