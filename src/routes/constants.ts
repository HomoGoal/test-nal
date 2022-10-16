type UrlType = {
  Home: string;
  Detail: string;
};

const URL = "https://homogoal.github.io/";

export const Router: UrlType = {
  Home: URL,
  Detail: `${URL}detail/:id`,
};
