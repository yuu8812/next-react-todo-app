import type { GetServerSideProps, NextPage } from 'next';
import { resetServerContext } from 'react-beautiful-dnd';

import InputComponent from './InputComponent ';
import Header from './Header';
import DragDropComponent from './DragDropComponent';

const Home: NextPage = () => {
  return (
    <div className="font-DynaPuff">
      <div className="fixed z-10">
        <Header />
        <InputComponent />
      </div>
      <div className="pt-32">
        <DragDropComponent />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({}) => {
  resetServerContext(); // <-- CALL RESET SERVER CONTEXT, SERVER SIDE
  return { props: { data: [] } };
};

export default Home;
