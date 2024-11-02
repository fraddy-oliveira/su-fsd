"use client";

import { FilterType } from "@app/utils/grid";

type Props = {
  handleFilterChange: (sortType: FilterType) => void;
};

export default function Filter({ handleFilterChange }: Props) {
  const sortOptions: Record<string, string> = {
    [FilterType.CREATED_AT_ASC]: "created at",
    [FilterType.FILENAME_ASC]: "filename ascending",
    [FilterType.FILENAME_DESC]: "filename descending",
  };

  return (
    <div className="flex justify-center mb-10">
      <select
        className="bg-black border border-white rounded-lg px-5 py-2 focus:outline-none"
        // TODO: Remove Type Assertion 'as FilterType'
        onChange={(e) => handleFilterChange(e.target.value as FilterType)}
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
