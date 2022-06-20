import * as i from 'types';

import PrimeLayout from 'layouts/PrimeLayout';

const Home: i.NextPageComponent = () => {
  return (
    <>
      <p>
        Created by
        <a href="https://github.com/sandervspl"> @sandervspl </a>
        and maintained by
        <a href="https://labela.nl/"> LabelA</a>
      </p>
    </>
  );
};

// This pattern makes it possible to create layouts which only mount once. Useful for sidebars etc.
// You should only see a single "Layout mounted!" log in the console.
// This is a similar pattern to wrapping a layout around routes with react-router
Home.layout = (page) => {
  return (
    <PrimeLayout>{page}</PrimeLayout>
  );
};

export default Home;
