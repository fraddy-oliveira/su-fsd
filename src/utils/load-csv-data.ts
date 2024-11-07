import "server-only";

import fs from "fs";
import { parse } from "csv-parse";
import { finished } from "stream/promises";

export async function loadCSVData(filepath: string): Promise<string[][]> {
  const records: string[][] = [];

  const parser = fs.createReadStream(filepath).pipe(parse({ delimiter: ";" }));

  parser.on("readable", function () {
    let record: string[];

    while ((record = parser.read()) !== null) {
      records.push([...record]);
    }
  });

  await finished(parser);

  return records;
}
