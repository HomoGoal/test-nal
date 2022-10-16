import request from "../../request";

type Submit = {
  id?: string;
  params: object;
  data?: object;
};

export const createComment = async (data: Submit) =>
  request({
    url: `/api/v2/blogs/${data?.id}/comments`,
    method: "POST",
    data: data?.data,
  });

export const listComment = async (data: Submit) =>
  request({
    url: `/api/v2/blogs/${data.id}/comments`,
    method: "GET",
    params: data?.params,
  });

export const detailComment = async (id: Submit) =>
  request({
    url: `/api/v2/comments/${id}`,
    method: "GET",
  });

export const updateComment = async (id: Submit) =>
  request({
    url: `/api/v2/comments/${id}`,
    method: "PUT",
  });

export const deleteComment = async (id: Submit) =>
  request({
    url: `/api/v2/comments/${id}`,
    method: "DELETE",
  });
