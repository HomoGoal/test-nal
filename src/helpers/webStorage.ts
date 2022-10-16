import Cookies from "js-cookie";
import _isString from "lodash/isString";
import { ACCESS_TOKEN } from "../constants/configs";

export default {
  set(key: any, rawValue: any) {
    const value = _isString(rawValue) ? rawValue : JSON.stringify(rawValue);

    Cookies.set(key, value);
  },
  get(key: any) {
    const value: any = Cookies.get(key);

    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  },

  remove(key: any) {
    Cookies.remove(key);
  },
  removeAll() {
    Object.keys(Cookies.get()).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });
  },

  setToken(value: any) {
    this.set(ACCESS_TOKEN, value);
  },
  getToken() {
    return this.get(ACCESS_TOKEN);
  },
};
