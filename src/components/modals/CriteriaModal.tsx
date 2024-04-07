'use client';
import React from 'react';
import Modal from './Modal';

const CriteriaModal = () => {
  return (
    <Modal>
      <div className="flex flex-col items-center bg-primary-dark rounded-xl p-5 max-w-[442px]">
        <h1 className="text-2xl font-bold leading-9 text-center text-lime-500 capitalize">
          You’re just one step away
          <br />
          <span className="text-accent">From creating your community!</span>
        </h1>
        <p className="justify-center text-secondary">
          Verify your existing social links to lorem ipsum dolor sit amet
        </p>
      </div>
    </Modal>
  );
};

export default CriteriaModal;
