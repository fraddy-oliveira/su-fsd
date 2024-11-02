"use client";

import { useEffect, useState } from "react";
import FileListing from "../FileListing/FileListing";
import Filter from "../Filter/Filter";
import fetchFiles, { FileInfoType } from "@app/services/fetch-files";
import { FilterType } from "@app/utils/grid";

type StatusType = "loading" | "success" | "error";

type Props = {
  initialFileListing: FileInfoType[];
};

export default function FileGrid({ initialFileListing }: Props) {
  const [status, setStatus] = useState<StatusType>("loading");
  const [files, setFiles] = useState<FileInfoType[]>([]);

  const handleFilterChange = async (sortType: FilterType) => {
    try {
      setStatus("loading");

      const files = await fetchFiles(sortType);

      setFiles(files);
      setStatus("success");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setFiles([]);
      setStatus("error");
    }
  };

  useEffect(() => {
    setFiles(initialFileListing);
    setStatus("success");
  }, [initialFileListing]);

  let content = null;

  switch (status) {
    case "loading":
      content = "Loading files...";
      break;
    case "success":
      content = files.length ? (
        <FileListing files={files} />
      ) : (
        "Oops, no files found"
      );
      break;
    case "error":
      content = "Oops, Something went wrong";
      break;
  }

  return (
    <div>
      <Filter handleFilterChange={handleFilterChange} />

      {content}
    </div>
  );
}
