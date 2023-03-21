import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import fb from "@/utils/fb";
import api from "@/utils/api";
import { FbAuthResponse } from "@/types/types";

export interface User {
  email: string;
  id: number;
  name: string;
  picture: string;
  provider: string;
}

export interface AuthContextInterface {
  isLogin: boolean;
  user: User | null;
  loading: boolean;
  jwtToken: string;
  login: () => void;
  logout: () => void;
  error: string;
}

export const AuthContext = createContext<AuthContextInterface>({
  isLogin: false,
  user: null,
  loading: false,
  jwtToken: "",
  login: () => {},
  logout: () => {},
  error: "",
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [jwtToken, setJwtToken] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLoginResponse = useCallback(async (response: FbAuthResponse) => {
    setError("");
    const accessToken = response.authResponse.accessToken;
    const { data, error } = await api.signin({
      provider: "facebook",
      access_token: accessToken,
    });
    if (!data && error) {
      setError(error.code);
      return;
    }
    const { access_token: tokenFromServer, user: userData } = data;
    setUser(userData);
    setJwtToken(tokenFromServer);
    window.localStorage.setItem("jwtToken", tokenFromServer);
    setIsLogin(true);
    return tokenFromServer;
  }, []);

  useEffect(() => {
    const checkAuthStatus = async () => {
      await fb.init();
      const response = (await fb.getLoginStatus()) as FbAuthResponse;
      if (response.status === "connected") {
        handleLoginResponse(response);
        setLoading(false);
      } else {
        window.localStorage.removeItem("jwtToken");
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, [handleLoginResponse]);

  const login = async () => {
    setLoading(true);
    const response = (await fb.login()) as FbAuthResponse;
    if (response.status === "connected") {
      const tokenFromServer = handleLoginResponse(response);
      setLoading(false);
      return tokenFromServer;
    } else {
      window.localStorage.removeItem("jwtToken");
      setLoading(false);
      return null;
    }
  };

  const logout = async () => {
    setLoading(true);
    await fb.logout();
    setIsLogin(false);
    setUser(null);
    setJwtToken("");
    window.localStorage.removeItem("jwtToken");
    setLoading(false);
  };

  const value = {
    isLogin,
    user,
    loading,
    jwtToken,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
