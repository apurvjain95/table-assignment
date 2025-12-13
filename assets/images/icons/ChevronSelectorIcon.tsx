import classNames from "classnames";
import { SVGProps } from "react";

const ChevronSelectorIcon = ({
  horizontal = false,
  ...props
}: SVGProps<SVGSVGElement> & { horizontal?: boolean }) => {
  const { className, ...remainingProps } = props;
  const mergedClassNames = classNames(className, horizontal ? "rotate-90" : "");
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={mergedClassNames}
      {...remainingProps}
    >
      <path
        d="M3.5 7.5L6 10L8.5 7.5M3.5 4.5L6 2L8.5 4.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevronSelectorIcon;
