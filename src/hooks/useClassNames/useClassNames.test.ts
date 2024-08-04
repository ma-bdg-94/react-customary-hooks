import { renderHook } from "@testing-library/react";
import useClassNames from "./useClassNames";

describe("useClassNames hook", () => {
  it("should return className object by default", () => {
    const { result } = renderHook(() => useClassNames());

    const className = "test-class";
    const classObj = result.current.class(className, {});

    expect(classObj).toEqual({ className });
  });

  it("should return id object when options.id is true", () => {
    const { result } = renderHook(() => useClassNames());

    const className = "test-class";
    const idObj = result.current.class(className, { id: true });

    expect(idObj).toEqual({ id: className });
  });

  it("should combine multiple class names correctly", () => {
    const { result } = renderHook(() => useClassNames());

    const combinedClassNames = result.current.combine("class1", "class2", false, "class3", null, undefined, "class4");

    expect(combinedClassNames).toBe("class1 class2 class3 class4");
  });

  it("should handle combining class names with falsy values", () => {
    const { result } = renderHook(() => useClassNames());

    const combinedClassNames = result.current.combine("class1", "", "class2", null, undefined, false, "class3");

    expect(combinedClassNames).toBe("class1 class2 class3");
  });

});
