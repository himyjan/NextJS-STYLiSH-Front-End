import Footer from "./Footer/Footer";
import Header from "./Header/Header";

const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-308px)]">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
