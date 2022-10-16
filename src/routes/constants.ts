type UrlType = {
  Home: string;
  Detail: string;
};

export const URL = "https://homogoal.github.io/test-nal/";

const host = "homogoal.github.io";

export const Router: UrlType = {
  Home: `/test-nal`,
  Detail: `/test-nal/detail/:id`,
};
