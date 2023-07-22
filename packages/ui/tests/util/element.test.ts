import { describe, expect, it, beforeEach } from "vitest";
import { hideElement, showElement } from "@snebur/ui/src/util/element";
import { getDocument } from "../test-util";


describe("element utility functions", () => {

  const document = getDocument();
  let element: HTMLElement;
  
  beforeEach(() => {
    element = document.createElement("div");
  });

  describe("hideElement", () => {
    it("should set the display style to 'none'", () => {
      hideElement(element);
      expect(element.style.display).toBe("none");
    });
    

    it("should not throw an error if the element is null", () => {
      expect(() => hideElement(null)).not.toThrow();
    });
  });

  describe("showElement", () => {
    it("should set the display style to an empty string", () => {
      showElement(element);
      expect(element.style.display).toBe("");
    });

    it("should not throw an error if the element is null", () => {
      expect(() => showElement(null)).not.toThrow();
    });
  });
});