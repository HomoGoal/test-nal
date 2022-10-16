import "antd/dist/antd.css";
import { Provider } from "react-redux";
import { RouterLink } from "./routes";
import store from "./store";
import { useGoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

export default function App() {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId="163702406798-4kmej7jdeangfeuc17vvreu94g7fcchc.apps.googleusercontent.com">
        <RouterLink />
      </GoogleOAuthProvider>
    </Provider>
  );
}
