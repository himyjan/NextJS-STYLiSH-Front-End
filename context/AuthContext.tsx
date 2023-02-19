import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import fb from "@/utils/fb";
import api from "@/utils/api";

export interface AuthContextInterface {
  isLogin: boolean;
  user: any;
  loading: boolean;
  jwtToken: string;
  login: () => void;
  logout: () => void;
}

export interface User {
  email: string;
  id: number;
  name: string;
  picture: string;
  provider: string;
}

export const AuthContext = createContext<AuthContextInterface>({
  isLogin: false,
  user: {},
  loading: false,
  jwtToken: "",
  login: () => {},
  logout: () => {},
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

  const handleLoginResponse = useCallback(async (response: any) => {
    const accessToken = response.authResponse.accessToken;
    const { data } = await api.signin({
      provider: "facebook",
      access_token: accessToken,
    });
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
      const response = (await fb.getLoginStatus()) as { status: string };
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
    const response = (await fb.login()) as { status: string };
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
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
