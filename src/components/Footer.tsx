import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="relative">
      <Image
        src="/assets/bgs/footer.svg"
        alt="footer=bg"
        width={1440}
        height={829}
        style={{
          position: 'absolute',
          width: '100vw',
          bottom: 0,
          left: 0,
        }}
        className="pointer-events-none"
      />
      <section className="container flex flex-col-reverse">
        <section className="w-full flex flex-row justify-between mb-16">
          <p className="text-xs text-secondary">
            © 2024 Inagiffy All rights reserved
          </p>
          <section>
            <ul className="flex flex-row gap-6">
              <li>
                <Link href="#" className="cursor-pointer">
                  <Image
                    src="/assets/logos/insta.svg"
                    alt="instagram"
                    width={24}
                    height={24}
                  />
                </Link>
              </li>
              <li>
                <Link href="#" className="cursor-pointer">
                  <Image
                    src="/assets/logos/linkedin.svg"
                    alt="linkedin"
                    width={24}
                    height={24}
                  />
                </Link>
              </li>
              <li>
                <Link href="#" className="cursor-pointer">
                  <Image
                    src="/assets/logos/telegram.svg"
                    alt="telegram"
                    width={24}
                    height={24}
                  />
                </Link>
              </li>
              <li>
                <Link href="#" className="cursor-pointer">
                  <Image
                    src="/assets/logos/twitter.svg"
                    alt="twitter"
                    width={24}
                    height={24}
                  />
                </Link>
              </li>
            </ul>
          </section>
          <section>
            <ul className="flex flex-row gap-10">
              <li>
                <Link
                  href="#"
                  className="text-xs text-secondary cursor-pointer"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-xs text-secondary cursor-pointer"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </section>
        </section>
        <section className="w-full flex flex-row justify-center items-center mb-20">
          <ul className="flex flex-row gap-6">
            <li>
              <Link href="#" className="text-sm text-secondary cursor-pointer">
                Benefits
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-secondary cursor-pointer">
                Services
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-secondary cursor-pointer">
                Work
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-secondary cursor-pointer">
                Team
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-secondary cursor-pointer">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-secondary cursor-pointer">
                FAQ
              </Link>
            </li>
          </ul>
        </section>
        <h3 className="w-full text-center text-2xl mb-5">Tagline Goes Here</h3>
        <Image
          src="/assets/logos/logo.svg"
          alt="logo"
          width={162}
          height={64}
          className="mb-5 self-center mt-20"
        />
      </section>
    </div>
  );
};

export default Footer;
