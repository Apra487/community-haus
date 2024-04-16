import React, { useState } from 'react';

interface Props {
  question: string;
  answer: string;
}

const Faq: React.FC<Props> = ({ question, answer }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <section
      className={`w-full ${toggle ? 'bg-primary-dark' : 'bg-transparent'} rounded-lg flex flex-col border-2 ${toggle ? 'border-primary' : 'border-accent'}`}
    >
      <h5
        className={`w-full cursor-pointer inline-flex items-center ${toggle ? 'text-accent' : 'text-primary'} justify-between text-2xl p-7 font-semibold ${toggle && 'border-b-2 border-b-secondary'}`}
        onClick={() => setToggle(!toggle)}
      >
        {question}
        {toggle ? (
          <svg
            width="24"
            height="14"
            viewBox="0 0 24 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.477287 11.0329L10.8477 0.662425C11.4841 0.0260431 12.5159 0.0260431 13.1523 0.662425L23.5227 11.0329C24.1591 11.6692 24.1591 12.701 23.5227 13.3374C22.8863 13.9738 21.8546 13.9738 21.2182 13.3374L12 4.11924L2.78183 13.3374C2.14545 13.9738 1.11367 13.9738 0.477287 13.3374C-0.159096 12.701 -0.159096 11.6692 0.477287 11.0329Z"
              fill="white"
            />
          </svg>
        ) : (
          <svg
            width="24"
            height="14"
            viewBox="0 0 24 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M23.5227 2.96713L13.1523 13.3376C12.5159 13.974 11.4841 13.974 10.8477 13.3376L0.477287 2.96713C-0.159096 2.33075 -0.159096 1.29897 0.477287 0.662588C1.11367 0.0262061 2.14545 0.0262062 2.78183 0.662589L12 9.88076L21.2182 0.662589C21.8546 0.026207 22.8863 0.0262071 23.5227 0.662589C24.1591 1.29897 24.1591 2.33075 23.5227 2.96713Z"
              fill="white"
            />
          </svg>
        )}
      </h5>
      {toggle && <p className="text-lg p-7">{answer}</p>}
    </section>
  );
};

export default Faq;
