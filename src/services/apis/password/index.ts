import request from "../../request";

export const forgotPassword = async (data: object) =>
  request({
    url: "/api/v2/reset_password",
    method: "POST",
    data,
  });

export const verifyToken = async (params: object) =>
  request({
    url: "/api/v2/reset_password",
    method: "GET",
    params,
  });

export const resetPassword = async (params: object) =>
  request({
    url: "/api/v2/reset_password",
    method: "PUT",
    params,
  });
