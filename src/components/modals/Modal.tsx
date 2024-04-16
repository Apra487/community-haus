interface IModal {
  children: React.ReactNode;
}

const Modal: React.FC<IModal> = ({ children }) => {
  return (
    <section className="relative max-h-[98%] overflow-y-auto bg-primary-dark rounded-xl text-primary border border-accent border-solid">
      {children}
    </section>
  );
};

export default Modal;
