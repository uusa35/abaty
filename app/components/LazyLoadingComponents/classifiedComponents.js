import React, {lazy} from 'react';

export const ClassifiedCategoryHorizontalRoundedWidget = lazy(() =>
  import(
    '../../components/widgets/category/ProductCategoryHorizontalRoundedWidget'
  )
);

export const ClassifiedListHorizontal = lazy(() =>
  import('../../components/widgets/classified/ClassifiedListHorizontal')
);
