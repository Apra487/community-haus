import { useContext } from 'react';
import { ModalContext } from '@/context';

const useModal = () => {
  const { openModal, closeModal } = useContext(ModalContext);

  return { openModal, closeModal };
};

export default useModal;
