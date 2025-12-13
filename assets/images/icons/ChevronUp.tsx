import { SVGProps } from "react";

const ChevronUp = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      data-cy-icon="ChevronUp"
    >
      <rect
        width="20"
        height="20"
        transform="matrix(-1 0 0 -1 20 20)"
        fill="white"
        fillOpacity="0.01"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.8197 11.7893C15.5679 12.0579 15.146 12.0715 14.8774 11.8197L10 7.24714L5.12266 11.8197C4.854 12.0715 4.43213 12.0579 4.18026 11.7893C3.92853 11.5207 3.94213 11.0988 4.21066 10.847L9.54404 5.84693C9.80048 5.60653 10.1995 5.60653 10.456 5.84693L15.7893 10.847C16.0579 11.0988 16.0715 11.5207 15.8197 11.7893Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ChevronUp;
