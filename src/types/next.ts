import type { NextComponentType, NextPageContext } from 'next';
import type { O } from 'ts-toolbelt';

// Update the NextPageContext with a union type of Query
// This makes it so that NextPageContext.query is of type Query instead of a generic object-like type
export type AugmentedNextPageContext<Query = {}> = O.Update<NextPageContext, 'query', Query>;

// Augment the NextComponentType with our improved Context type and add types for our layout pattern
export type NextPageComponent<Props = {}, Query = {}> = NextComponentType<
  AugmentedNextPageContext<Query>,
  {},
  Props
> & {
  layout?: (page: React.ReactElement) => React.ReactNode;
};
