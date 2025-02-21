import { describe, expect, it, vitest } from "vitest";
import { generateOptionsFixture } from "../__tests__/generateOptionsFixture";
import { createStringTreeNode } from "../tree";
import formatTree from "./formatTree";
import formatTreeNode from "./formatTreeNode";

vitest.mock("./formatTreeNode");

describe("formatTree", () => {
  it("should format the node as a root node", () => {
    vitest.mocked(formatTreeNode).mockReturnValue("<MockedComponent />");

    const tree = createStringTreeNode("42");
    const options = generateOptionsFixture({});

    const result = formatTree(tree, options);

    expect(formatTreeNode).toHaveBeenCalledWith(tree, false, 0, options);

    expect(result).toBe("<MockedComponent />");
  });
});
