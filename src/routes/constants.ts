type UrlType = {
  Home: string;
  Detail: string;
};

export const URL = "https://homogoal.github.io/test-nal/";

export const Router: UrlType = {
  Home: URL,
  Detail: `${URL}detail/:id`,
};
