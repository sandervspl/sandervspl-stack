import * as React from 'react';
import Image from 'next/future/image';

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <section className="py-0 px-2 text-center leading-6">
        {children}
        <a
          href="https://github.com/sandervspl/sandervspl-stack"
          className="mt-4 inline-block h-5 w-5"
        >
          <Image
            src="/images/github-logo.png"
            width={128}
            height={128}
            alt="github"
            className="w-full"
            priority
          />
        </a>
      </section>
    </>
  );
};

type Props = {
  children: React.ReactElement;
};

export default Layout;
