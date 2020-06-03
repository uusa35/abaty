import React, {lazy} from 'react';

export const ClassifiedCategoryHorizontalRoundedWidget = lazy(() =>
  import(
    '../../components/widgets/category/ClassifiedCategoryHorizontalRoundedWidget.js'
  ),
);

export const ClassifiedListHorizontal = lazy(() =>
  import('../../components/widgets/classified/ClassifiedListHorizontal'),
);

export const HomeKeySearchTab = lazy(() =>
  import('../../components/widgets/search/HomeKeySearchTab'),
);

export const ServiceList = lazy(() =>
  import('../../components/widgets/service/ServiceList'),
);
