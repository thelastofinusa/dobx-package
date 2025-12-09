import { describe, it, expect } from "vitest";

import { parseDOB } from "../src/parseDOB";
import { DOBString } from "../src/types";

describe("parseDOB", () => {
  it("parses slash format: 01/09/2003", () => {
    const dob = parseDOB("01/09/2003");
    expect(dob.day).toBe(1);
    expect(dob.month).toBe(9);
    expect(dob.year).toBe(2003);
  });

  it("parses dash format: 01-09-2003", () => {
    const dob = parseDOB("01-09-2003");
    expect(dob.day).toBe(1);
    expect(dob.month).toBe(9);
    expect(dob.year).toBe(2003);
  });

  it("parses dot format: 01.09.2003", () => {
    const dob = parseDOB("01.09.2003");
    expect(dob.day).toBe(1);
    expect(dob.month).toBe(9);
    expect(dob.year).toBe(2003);
  });

  it("parses dot format without leading zero: 1.9.2003", () => {
    const dob = parseDOB("1.9.2003");
    expect(dob.day).toBe(1);
    expect(dob.month).toBe(9);
    expect(dob.year).toBe(2003);
  });

  it("parses month name format: 1 Sept 2003", () => {
    const dob = parseDOB("1 Sept 2003");
    expect(dob.day).toBe(1);
    expect(dob.month).toBe(9);
    expect(dob.year).toBe(2003);
  });

  it("parses with comma: 1 Sept, 2003", () => {
    const dob = parseDOB("1 Sept, 2003");
    expect(dob.day).toBe(1);
    expect(dob.month).toBe(9);
    expect(dob.year).toBe(2003);
  });

  it("parses full month name: 1 September 2003", () => {
    const dob = parseDOB("1 September 2003");
    expect(dob.day).toBe(1);
    expect(dob.month).toBe(9);
    expect(dob.year).toBe(2003);
  });

  it("removes ordinal suffix: 1st Sept 2003", () => {
    const dob = parseDOB("1st Sept 2003" as DOBString);
    expect(dob.day).toBe(1);
    expect(dob.month).toBe(9);
    expect(dob.year).toBe(2003);
  });

  it("parses leap-year date correctly", () => {
    const dob = parseDOB("29/02/2000");
    expect(dob.isLeapYear).toBe(true);
  });

  it("throws for invalid dates", () => {
    expect(() => parseDOB("32/13/2003" as DOBString)).toThrow();
  });

  it("calculates age", () => {
    const dob = parseDOB("01/01/2000");

    const now = new Date();
    const expectedAge =
      now.getFullYear() -
      2000 -
      (now < new Date(now.getFullYear(), 0, 1) ? 1 : 0);

    expect([expectedAge, expectedAge - 1]).toContain(dob.age);
  });
});
