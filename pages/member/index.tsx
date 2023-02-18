import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

const Member = () => {
  const { user, isLogin, login, logout, loading } = useAuth();
  console.log(user);

  const renderContent = () => {
    if (isLogin)
      return (
        <div className="flex flex-col items-center">
          <div className="relative">
            <Image
              width={100}
              height={100}
              src={user.picture}
              alt={user.name}
            />
          </div>
          <div>{user.name}</div>
          <div>{user.email}</div>
          <button
            onClick={logout}
            className="bg-fb-blue text-white p-[10px] rounded-[8px]"
          >
            Logout
          </button>
        </div>
      );

    return (
      <button
        onClick={login}
        className="bg-fb-blue text-white p-[10px] rounded-[8px]"
      >
        Login with facebook
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center p-[20px]">
      <div className="text-[20px] p-[5px] border-b mb-[20px]">會員基本資料</div>
      <div>{renderContent()}</div>
    </div>
  );
};

export default Member;
