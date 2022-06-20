import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const userId = '3783ce59-0e59-4a77-aaaf-e824f7c5e8f1';

const Layout: React.FC<Props> = ({ children }) => {
  const [randomNum, setRandomNum] = React.useState<number | null>(null);

  React.useEffect(() => {
    setRandomNum(Math.floor(Math.random() * 1000));
    console.info('Layout Mounted!');
  }, []);

  return (
    <>
      <section className="text-center py-0 px-2 leading-6">
        <ul className="flex gap-2 list-none border-r-[1px] border-gray-500 last:border-none">
          <li><Link href={`/csr/${userId}`}>CSR Page</Link></li>
          <li><Link href={`/ssr/${userId}`}>SSR Page</Link></li>
          <li><Link href="/ssg">SSG Page</Link></li>
          <li><Link href="/issg/1">iSSG (build-time) Page</Link></li>
          <li><Link href={`/issg/${randomNum}`}>iSSG (run-time) Page</Link></li>
        </ul>
        {children}
        <div>
          <a href="https://github.com/sandervspl/sandervspl-stack" className="w-5 h-5 inline-block">
            <Image src="/images/github-logo.png" width={128} height={128} alt="github" className="w-full" priority />
          </a>
        </div>
      </section>
    </>
  );
};

type Props = {
  children: React.ReactElement;
};

export default Layout;
