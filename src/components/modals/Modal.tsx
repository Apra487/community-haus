import Image from 'next/image';

interface IModal {
  children: React.ReactNode;
}

const Modal: React.FC<IModal> = ({ children }) => {
  return (
    <section className="relative flex flex-col items-center justify-center bg-primary-dark text-primary">
      {children}
    </section>
  );
};

export default Modal;
