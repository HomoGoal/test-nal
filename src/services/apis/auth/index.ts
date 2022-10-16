import request from "../../request";

export const login = async (data: any) =>
  request({
    url: `/api/v2/login`,
    method: "POST",
    data,
  });

export const loginGoogle = async (data: object) =>
  request({
    url: `/api/v2/login/google`,
    method: "POST",
    data,
  });

export const detailComment = async (id: string) =>
  request({
    url: `/api/v2/comments/${id}`,
    method: "GET",
  });

export const logout = async () =>
  request({
    url: `/api/v2/logout`,
    method: "DELETE",
  });

export const getMe = async () =>
  request({
    url: `/api/v2/me`,
    method: "GET",
  });

export const updateProfile = async (data: object) =>
  request({
    url: `/api/v2/me`,
    method: "PUT",
    data,
  });

export const register = async (data: any) =>
  request({
    url: `/api/v2/users`,

    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });

export const refreshToken = async (data: object) =>
  request({
    url: `/api/v2/refresh_tokens`,
    method: "POST",
    data,
  });
