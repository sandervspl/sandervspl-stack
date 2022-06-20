import * as React from 'react';
import Image from 'next/image';

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <section className="text-center py-0 px-2 leading-6">
        {children}
        <a href="https://github.com/sandervspl/sandervspl-stack" className="w-5 h-5 inline-block mt-4">
          <Image src="/images/github-logo.png" width={128} height={128} alt="github" className="w-full" priority />
        </a>
      </section>
    </>
  );
};

type Props = {
  children: React.ReactElement;
};

export default Layout;
