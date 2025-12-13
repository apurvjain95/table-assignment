import classNames from "classnames";
import { HTMLProps } from "react";

const LineLoader = (props: HTMLProps<HTMLDivElement>) => {
  const { className: propsClassname, ...remainingProps } = props;
  const mergedClassName = classNames(
    "w-full h-0.5 relative overflow-hidden bg-transparent rounded-lg",
    propsClassname
  );
  return (
    <div
      className={mergedClassName}
      {...remainingProps}
      data-cy="LineLoader-container"
      id="line-loader-container"
    >
      <div
        className="absolute w-1/2 h-[inherit] bg-current rounded-lg animate-lineLoad"
        data-cy="LineLoader-line"
      />
    </div>
  );
};

export default LineLoader;
