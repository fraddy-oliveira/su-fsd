"use server";

import { FileSortingOptionsType } from "@app/utils/file-grid-constants";
import { loadCSVData } from "@app/utils/load-csv-data";
import orderByFilename from "@app/utils/order-by-filename";

export type FileInfoType = {
  rowNumber: number;
  name: string;
  date: string;
};

export async function getFilesAction(
  sort: FileSortingOptionsType = FileSortingOptionsType.CREATED_AT_ASC
): Promise<FileInfoType[]> {
  let rowNumber = 1;

  const records: FileInfoType[] = (
    await loadCSVData(process.cwd() + "/src/data/data.csv")
  ).map((record) => ({
    rowNumber: rowNumber++,
    date: record[0],
    name: record[1],
  }));

  switch (sort) {
    case FileSortingOptionsType.FILENAME_ASC:
      records.sort(({ name: a }, { name: b }) =>
        orderByFilename(a.toUpperCase(), b.toUpperCase(), "ASC")
      );
      break;
    case FileSortingOptionsType.FILENAME_DESC:
      records.sort(({ name: a }, { name: b }) =>
        orderByFilename(a.toUpperCase(), b.toUpperCase(), "DESC")
      );
      break;
    case FileSortingOptionsType.CREATED_AT_ASC:
    default:
      records.sort(({ date: a }, { date: b }) => (a < b ? -1 : a > b ? 1 : 0));
      break;
  }

  return records;
}
