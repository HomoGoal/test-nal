type UrlType = {
  Home: string;
  Detail: string;
};

const URL = "homogoal.github.io/test-nal/";

export const Router: UrlType = {
  Home: URL,
  Detail: `${URL}detail/:id`,
};
