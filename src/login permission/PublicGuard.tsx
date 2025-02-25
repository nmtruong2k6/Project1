import React, { Fragment, ReactElement, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { LOCAL_USER_KEY } from "../configs/auth.config";
import { RouterUrl } from "../enums/router.enum";

type Props = {
  children: ReactNode | ReactElement;
};

const Public: React.FC<Props> = ({ children }) => {
  const auth = JSON.parse(localStorage.getItem(LOCAL_USER_KEY) || "{}");
  return (
    <Fragment>
      {auth && auth.access_token ? (
        <Navigate to={RouterUrl.Home} />
      ) : (
        <Fragment>{children}</Fragment>
      )}
    </Fragment>
  );
};

export { Public };
