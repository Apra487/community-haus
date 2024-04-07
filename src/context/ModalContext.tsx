'use client';
import React, { createContext, useCallback, useState } from 'react';

interface IModalContextProps {
  // eslint-disable-next-line no-unused-vars
  openModal: (modal: React.ReactNode) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<IModalContextProps>({
  openModal: () => {},
  closeModal: () => {},
});

interface IModalProviderProps {
  children: React.ReactNode;
}

export const ModalProvider = ({ children }: IModalProviderProps) => {
  const [modal, setModal] = useState<React.ReactNode>(null);

  const openModal = useCallback((modal: React.ReactNode) => {
    setModal(modal);
  }, []);

  const closeModal = useCallback(() => {
    setModal(null);
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modal && (
        <div
          className="w-screen h-screen fixed flex z-50 justify-center items-center"
          style={{
            background: 'rgba(0, 0, 0, 0.24)',
            backdropFilter: 'blur(9.949999809265137px)',
          }}
        >
          {modal}
        </div>
      )}
    </ModalContext.Provider>
  );
};
