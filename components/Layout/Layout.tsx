import { AppDispatch } from '@/store';
import { initCartDataHandler } from '@/store/cart-actions';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AnyAction } from '@reduxjs/toolkit';
import Footer from './Footer/Footer';
import Header from './Header/Header';

const Layout = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(initCartDataHandler() as unknown as AnyAction);
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-308px)] xl:min-h-[calc(100vh-255px)]">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
