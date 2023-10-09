import React from "react";

type VisibilityProp = {
  visibility: boolean;
  children?: React.ReactNode;
  className?: string;
};

const Visibility = React.forwardRef<HTMLDivElement, VisibilityProp>(
  ({ visibility, children, className }, ref) => {
    return (
      <div className={className} ref={ref}>
        {visibility ? children : null}
      </div>
    );
  }
);

Visibility.displayName = "Visibility";

export { Visibility };
