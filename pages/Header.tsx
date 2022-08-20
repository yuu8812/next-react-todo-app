import type { NextPage } from 'next';
import Head from 'next/head';
import { decrement, increment } from '../features/counter/counterSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const Header: NextPage = () => {
  return (
    <>
      <Head>
        <title>My page title</title>
      </Head>
      <div className="w-screen flex items-center justify-center">
        <div className="font-bold text-2xl m-4">tasikify</div>
      </div>
    </>
  );
};

export default Header;
