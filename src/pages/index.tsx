import * as i from 'types';

import { Anchor } from 'common';
import PrimeLayout from 'layouts/PrimeLayout';

const Home: i.NextPageComponent = () => {
  return (
    <>
      <p>
        Created by
        <Anchor to="https://github.com/sandervspl"> @sandervspl </Anchor>
        and maintained by
        <Anchor to="https://labela.nl/"> LabelA</Anchor>
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
