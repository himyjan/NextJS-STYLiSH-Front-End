import Header from "./Header/Header";

const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
};

export default Layout;
