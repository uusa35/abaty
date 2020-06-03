import React, {lazy} from 'react';

export const ServiceList = lazy(() =>
  import('../../components/widgets/service/ServiceList'),
);

export const ServiceWidget = lazy(() =>
  import('../../components/widgets/service/ServiceWidget'),
);
