"use server";

import "server-only";

import fs from "fs";
import { parse } from "csv-parse";
import { finished } from "stream/promises";
import { FilterType } from "@app/utils/grid";

export type FileInfoType = {
  rowNumber: number;
  name: string;
  date: string;
};

type SortType = "ASC" | "DESC";

const orderByFilename = (a: string, b: string, sortType: SortType = "ASC") => {
  const pattern =
    // @ts-expect-error: Named capturing groups are only available when targeting 'ES2018' or later.
    /^(?<firstnum>\d+)?(?<alpha>\D[^\.\d]+)?(?<secondnum>\d+)?(?<ext>\.\D+)?$/;

  const aMatch = new RegExp(pattern).exec(a);

  const bMatch = new RegExp(pattern).exec(b);

  let value: number;

  if (
    aMatch?.groups?.["firstnum"] &&
    bMatch?.groups?.["firstnum"] &&
    aMatch?.groups?.["firstnum"] !== bMatch?.groups?.["firstnum"]
  ) {
    if (
      Number(aMatch?.groups?.["firstnum"]) ===
      Number(bMatch?.groups?.["firstnum"])
    ) {
      value =
        aMatch?.groups?.["firstnum"].length <
        bMatch?.groups?.["firstnum"].length
          ? -1
          : 1;
    } else if (
      Number(aMatch?.groups?.["firstnum"]) <
      Number(bMatch?.groups?.["firstnum"])
    ) {
      value = -1;
    } else {
      value = 1;
    }
  } else if (aMatch?.groups?.["firstnum"]) {
    value = -1;
  } else if (bMatch?.groups?.["firstnum"]) {
    value = 1;
  } else if (
    aMatch?.groups?.["alpha"] &&
    bMatch?.groups?.["alpha"] &&
    aMatch?.groups?.["alpha"] !== bMatch?.groups?.["alpha"]
  ) {
    if (aMatch?.groups?.["alpha"] > bMatch?.groups?.["alpha"]) {
      value = 1;
    } else {
      value = -1;
    }
  } else if (
    aMatch?.groups?.["secondnum"] &&
    bMatch?.groups?.["secondnum"] &&
    aMatch?.groups?.["secondnum"] !== bMatch?.groups?.["secondnum"]
  ) {
    if (
      Number(aMatch?.groups?.["secondnum"]) ===
      Number(bMatch?.groups?.["secondnum"])
    ) {
      value =
        aMatch?.groups?.["secondnum"].length <
        bMatch?.groups?.["secondnum"].length
          ? -1
          : 1;
    } else if (
      Number(aMatch?.groups?.["secondnum"]) <
      Number(bMatch?.groups?.["secondnum"])
    ) {
      value = -1;
    } else {
      value = 1;
    }
  } else if (aMatch?.groups?.["secondnum"] && !bMatch?.groups?.["secondnum"]) {
    value = 1;
  } else if (!aMatch?.groups?.["secondnum"] && bMatch?.groups?.["secondnum"]) {
    value = -1;
  } else {
    value = 0;
  }

  return value === 0 ? 0 : sortType === "ASC" ? value : value < 0 ? 1 : -1;
};

async function loadCSVData(): Promise<string[][]> {
  const records: string[][] = [];

  const parser = fs
    .createReadStream(process.cwd() + "/src/data/data.csv")
    .pipe(parse({ delimiter: ";" }));

  parser.on("readable", function () {
    let record: string[];

    while ((record = parser.read()) !== null) {
      records.push([...record]);
    }
  });

  //  TODO: gracefully release parser
  await finished(parser);

  return records;
}

//  TODO: add unit test
export default async function fetchFiles(
  filter: FilterType = FilterType.CREATED_AT_ASC
): Promise<FileInfoType[]> {
  let rowNumber = 1;

  const records: FileInfoType[] = (await loadCSVData()).map((record) => ({
    rowNumber: rowNumber++,
    date: record[0],
    name: record[1],
  }));

  switch (filter) {
    case FilterType.FILENAME_ASC:
      records.sort(({ name: a }, { name: b }) =>
        orderByFilename(a.toUpperCase(), b.toUpperCase(), "ASC")
      );
      break;
    case FilterType.FILENAME_DESC:
      records.sort(({ name: a }, { name: b }) =>
        orderByFilename(a.toUpperCase(), b.toUpperCase(), "DESC")
      );
      break;
    case FilterType.CREATED_AT_ASC:
    default:
      records.sort(({ date: a }, { date: b }) => (a < b ? -1 : a > b ? 1 : 0));
      break;
  }

  return records;
}
