import React, {lazy} from 'react';

export const ProductList = lazy(() =>
  import('../../components/widgets/product/ProductList'),
);

export const ProductWidget = lazy(() =>
  import('../../components/widgets/product/ProductWidget'),
);
