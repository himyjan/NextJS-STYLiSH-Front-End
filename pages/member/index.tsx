import { useAuth } from "@/context/authContext";

const Member = () => {
  const { user, isLogin, login, logout, loading } = useAuth();

  const renderContent = () => {
    if (isLogin)
      return (
        <>
          <div>{user.name}</div>
          <div>{user.picture}</div>
          <div>{user.email}</div>
        </>
      );

    return <button onClick={login}>Login</button>;
  };

  return (
    <div>
      <div>會員基本資料</div>
      <div>{renderContent()}</div>
    </div>
  );
};

export default Member;
