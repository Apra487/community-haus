import React, { useState } from 'react';
import Image from 'next/image';

export const FAQ = [
  {
    question: 'Why Join Community Haus?',
    answer: `Many miss out on the artist's upcoming drops and creative journey. This platform connects enthusiasts directly with artists for exclusive insights and offers.`,
  },
  {
    question: 'How to Join the Community?',
    answer: `Simply sign up for the waitlist, and we'll guide you through the next steps.`,
  },
  {
    question: 'How to Start Your Community?',
    answer: `Once selected, we assist in launching your community, offering content and engagement support for the initial three months.`,
  },
  {
    question: 'What is the Cost involved?',
    answer: `It's free for DRiP creators for the first three months, followed by a customized retainer based on your community's specific needs.`,
  },
];

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
