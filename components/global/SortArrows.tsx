import ChevronDown from "@/assets/images/icons/ChevronDown";
import ChevronSelectorIcon from "@/assets/images/icons/ChevronSelectorIcon";
import ChevronUp from "@/assets/images/icons/ChevronUp";
import { SortObject } from "@/models/Generic";

const SortArrows = ({
  sortObject,
  sortKey,
}: {
  sortObject: SortObject;
  sortKey: string;
}) => {
  const isSortedUsingThisKey = sortObject.sortBy === sortKey;
  const isAscending = sortObject.sortOrder === "ASC";
  return (
    <>
      {isSortedUsingThisKey ? (
        isAscending ? (
          <ChevronUp className="w-3" />
        ) : (
          <ChevronDown className="w-3" />
        )
      ) : (
        <ChevronSelectorIcon className="w-3" />
      )}
    </>
  );
};

export default SortArrows;
