import orderByFilename from "./order-by-filename";

describe("orderByFilename", () => {
  test("sorting 'ab', 'cd' in ascending order should give -1", () => {
    expect(orderByFilename("ab", "cd", "ASC")).toBe(-1);
  });

  test("sorting 'dgg', 'acc' in descending order should give -1", () => {
    expect(orderByFilename("dgg", "acc", "DESC")).toBe(-1);
  });

  test("sorting 'pqr', 'xyz' in descending order should give 1", () => {
    expect(orderByFilename("pqr", "xyz", "DESC")).toBe(1);
  });

  test("sorting '1', '001' in ascending order should give -1", () => {
    expect(orderByFilename("1", "001", "ASC")).toBe(-1);
  });

  test("sorting '1', '3' in ascending order should give -1", () => {
    expect(orderByFilename("1", "3", "ASC")).toBe(-1);
  });

  test("sorting '021-abc.txt', 'abc010.txt' in ascending order should give -1", () => {
    expect(orderByFilename("021-abc.txt", "abc010.txt", "ASC")).toBe(-1);
  });

  test("sorting '01abc.txt', '1abc.txt' in ascending order should give 1", () => {
    expect(orderByFilename("01abc.txt", "1abc.txt", "ASC")).toBe(1);
  });

  test("sorting 'abc1.txt', 'abc010.txt' in ascending order should give -1", () => {
    expect(orderByFilename("abc1.txt", "abc010.txt", "ASC")).toBe(-1);
  });
});
