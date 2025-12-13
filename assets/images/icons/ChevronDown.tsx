import { SVGProps } from "react";

const ChevronDown = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      data-cy-icon="ChevronDown"
    >
      <rect width="20" height="20" fill="white" fillOpacity="0.01" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.18031 8.21071C4.43214 7.9421 4.85403 7.9285 5.12263 8.18031L10 12.7529L14.8773 8.18031C15.146 7.9285 15.5679 7.9421 15.8197 8.21071C16.0715 8.47932 16.0579 8.90122 15.7893 9.15303L10.456 14.1531C10.1995 14.3935 9.80048 14.3935 9.54404 14.1531L4.21071 9.15303C3.9421 8.90122 3.9285 8.47932 4.18031 8.21071Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ChevronDown;
