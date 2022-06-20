import * as React from 'react';
import Image from 'next/image';

import Logo from 'vectors/logo.svg';
import { Anchor } from 'common';

import { GithubLink, PrimeContent, PrimeHeader } from './styled';

const userId = '3783ce59-0e59-4a77-aaaf-e824f7c5e8f1';

const PrimeLayout: React.FC<Props> = ({ children }) => {
  const [randomNum, setRandomNum] = React.useState<number | null>(null);

  React.useEffect(() => {
    setRandomNum(Math.floor(Math.random() * 1000));
    console.info('Layout Mounted!');
  }, []);

  return (
    <>
      <PrimeHeader>
        <Logo />
      </PrimeHeader>
      <PrimeContent>
        <ul>
          <li><Anchor to={`/csr/${userId}`}>CSR Page</Anchor></li>
          <li><Anchor to={`/ssr/${userId}`}>SSR Page</Anchor></li>
          <li><Anchor to="/ssg">SSG Page</Anchor></li>
          <li><Anchor to="/issg/1">iSSG (build-time) Page</Anchor></li>
          <li><Anchor to={`/issg/${randomNum}`}>iSSG (run-time) Page</Anchor></li>
        </ul>
        {children}
        <div>
          <GithubLink to="https://github.com/react-prime/react-prime-ssr">
            <Image src="/images/github-logo.png" width={128} height={128} alt="github" />
          </GithubLink>
        </div>
      </PrimeContent>
    </>
  );
};

type Props = {
  children: React.ReactElement;
};

export default PrimeLayout;
