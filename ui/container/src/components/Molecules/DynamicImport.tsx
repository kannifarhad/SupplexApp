import React, { Suspense } from "react";
import Loader from "../Elements/LoadingCircle";

type IProps = {
  component: React.ComponentClass | React.FC;
  componentProps?: object;
};

const DynamicImport: React.FC<IProps> = (props) => {
  const Component = props.component;
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <Loader text="Loading..." />
        </div>
      }
    >
      <Component {...props.componentProps} />
    </Suspense>
  );
};

export default DynamicImport;
