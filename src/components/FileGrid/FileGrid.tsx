"use client";

import { useEffect, useState } from "react";
import FileListing from "../FileListing/FileListing";
import Sort from "../Sort/Sort";
import fetchFiles, { FileInfoType } from "@app/services/fetch-files";
import { FileSortingOptionsType } from "@app/utils/file-grid-constants";

type StatusType = "loading" | "success" | "error";

type Props = {
  initialFileListing: FileInfoType[];
};

export default function FileGrid({ initialFileListing }: Props) {
  const [status, setStatus] = useState<StatusType>("loading");
  const [files, setFiles] = useState<FileInfoType[]>([]);

  const handleSortChange = async (
    fileSortingOptions: FileSortingOptionsType
  ) => {
    try {
      setStatus("loading");

      const files = await fetchFiles(fileSortingOptions);

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
      <Sort handleSortChange={handleSortChange} />

      {content}
    </div>
  );
}
