import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div
        className="bg-main-picture bg-cover bg-green-500 min-h-screen
        flex flex-col h-screen w-screen -z-0 absolute items-center"
      >

        <Header />

        <Table />
      </div>
    );
  }
}

export default Wallet;
