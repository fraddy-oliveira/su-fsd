"use client";

import { FileSortingOptionsType } from "@app/utils/file-grid-constants";

type Props = {
  handleSortChange: (sortType: FileSortingOptionsType) => void;
};

export default function Sort({ handleSortChange }: Props) {
  const sortOptions: Record<string, string> = {
    [FileSortingOptionsType.CREATED_AT_ASC]: "created at ascendent",
    [FileSortingOptionsType.FILENAME_ASC]: "filename ascendent",
    [FileSortingOptionsType.FILENAME_DESC]: "filename descendent",
  };

  return (
    <div className="flex justify-center mb-10">
      <select
        className="bg-black border border-white rounded-lg px-5 py-2 focus:outline-none"
        // TODO: Remove Type Assertion 'as SortType'
        onChange={(e) =>
          handleSortChange(e.target.value as FileSortingOptionsType)
        }
      >
        {Object.keys(sortOptions).map((k) => (
          <option key={k} value={k}>
            Sort by {sortOptions[k]}
          </option>
        ))}
      </select>
    </div>
  );
}
