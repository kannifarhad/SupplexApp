import React, { Suspense } from "react";
import Loader from "../Elements/LoadingCircle";

type IProps = {
  component: React.ComponentClass | React.FC;
  componentProps?: object;
};

export const DynamicImport: React.FC<IProps> = (props) => {
  const Component = props.component;
  return (
    <Suspense
      fallback={
        <div className="loadingWrapper">
          <Loader />
        </div>
      }
    >
      <Component {...props.componentProps} />
    </Suspense>
  );
};

export default DynamicImport;
