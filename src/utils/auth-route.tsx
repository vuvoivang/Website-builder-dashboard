import React, { memo } from 'react';

import { IRoute } from './route';

interface AuthProps {
  route: IRoute;
  children: React.ReactNode;
  // location: string;
}

function AuthRoute(props: AuthProps) {
  return <>{props.children}</>;
}

export default memo(AuthRoute);
