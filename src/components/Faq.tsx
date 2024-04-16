import React, { useState } from 'react';
import Image from 'next/image';

interface Props {
  question: string;
  answer: string;
}

const Faq: React.FC<Props> = ({ question, answer }) => {
  const [toggle, setToggle] = useState(false);
  const isSmallDevice = window.innerWidth < 640;
  return (
    <section
      className={`w-full ${toggle ? 'bg-primary-dark' : 'bg-transparent'} rounded-lg flex flex-col border-2 ${toggle ? 'border-primary' : 'border-accent'}`}
    >
      <h5
        className={`w-full cursor-pointer inline-flex items-center ${toggle ? 'text-accent' : 'text-primary'} justify-between text-xs sm:text-2xl p-3 sm:p-7 font-semibold ${toggle && 'border-b-2 border-b-secondary'}`}
        onClick={() => setToggle(!toggle)}
      >
        {question}
        {toggle ? (
          <Image
            src="/assets/icons/white-arrow-up.svg"
            alt="arrow"
            width={isSmallDevice ? 12 : 24}
            height={isSmallDevice ? 12 : 24}
          />
        ) : (
          <Image
            src="/assets/icons/white-arrow-down.svg"
            alt="arrow"
            width={isSmallDevice ? 12 : 24}
            height={isSmallDevice ? 12 : 24}
          />
        )}
      </h5>
      {toggle && <p className="text-xs sm:text-lg p-3 sm:p-7">{answer}</p>}
    </section>
  );
};

export default Faq;
