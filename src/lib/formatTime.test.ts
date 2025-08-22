import { describe, it, expect } from "vitest";
import { formatTime } from "./formatTime";

describe("formatTime", () => {
    it("should return an empty string for null or undefined time", () => {
        expect(formatTime({ time: null })).toBe("");
    });

    it("should format times under a minute correctly", () => {
        expect(formatTime({ time: 12.345 })).toBe("12.34");
        expect(formatTime({ time: 0.567 })).toBe("0.56");
    });

    it("should format times over a minute correctly", () => {
        expect(formatTime({ time: 65.432 })).toBe("1:05.43");
        expect(formatTime({ time: 121.01 })).toBe("2:01.01");
    });

    it("should handle the +2 penalty", () => {
        expect(formatTime({ time: 10.12, penalty: "+2" })).toBe("10.12+");
    });

    it("should handle the DNF penalty without displaying time by default", () => {
        expect(formatTime({ time: 15.67, penalty: "dnf" })).toBe("DNF");
    });

    it("should display time on DNF when option is enabled", () => {
        expect(
            formatTime({ time: 15.67, penalty: "dnf", displayTimeOnDnf: true })
        ).toBe("DNF(15.67)");
    });
});
