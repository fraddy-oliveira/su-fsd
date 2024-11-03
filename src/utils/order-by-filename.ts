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

export default orderByFilename;
