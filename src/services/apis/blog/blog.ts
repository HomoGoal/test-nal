import request from "../../request";

export const listBlog = async (params: object) =>
  request({
    url: "/api/v2/blogs",
    method: "GET",
    params,
  });

export const createBlog = async (data: any) =>
  request({
    url: "/api/v2/blogs",
    method: "POST",
    data,
  });

export const detailBlog = async (id: number) =>
  request({
    url: `/api/v2/blogs/${id}`,
    method: "GET",
  });

export const updateBlog = async (data: any) =>
  request({
    url: `/api/v2/blogs/${data?.id}`,
    method: "PUT",
    data: data?.data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteBlog = async (id: number) =>
  request({
    url: `/api/v2/blogs/${id}`,
    method: "DELETE",
  });
