import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

const ERROR_MESSAGE = {
  ER_LOCK_WAIT_TIMEOUT: "Request login token timeout, please try again later.",
};

const Member = () => {
  const { user, isLogin, login, logout, loading, error } = useAuth();

  const renderContent = () => {
    if (loading) {
      return (
        <div className="h-40px w-40px bg-loading-spinner bg-center bg-cover" />
      );
    }

    if (isLogin && user)
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
      <div className="flex flex-col items-center gap-[10px]">
        <button
          onClick={login}
          className="bg-fb-blue text-white p-[10px] rounded-[8px] w-[200px]"
        >
          Login with facebook
        </button>
        {error && (
          <div className="text-[16px] xl:text-[20px] text-warning">
            {error === "ER_LOCK_WAIT_TIMEOUT"
              ? ERROR_MESSAGE.ER_LOCK_WAIT_TIMEOUT
              : "Something went wrong!"}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center p-[20px]">
      <div className="text-[20px] p-[5px] border-b mb-[20px]">會員基本資料</div>
      <div className="w-full">{renderContent()}</div>
    </div>
  );
};

export default Member;
