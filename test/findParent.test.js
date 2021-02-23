const TreeNode = require("../lib").default;

test("findParent", () => {
  const body = new TreeNode(
    {
      id: "blabla",
      type: "body",
    },
    [
      new TreeNode(
        {
          id: "container1",
          type: "container",
        },
        [
          new TreeNode({
            id: "container3",
            type: "container",
          }),
          new TreeNode({
            id: "container4",
            type: "container",
          }),
        ]
      ),
      new TreeNode({
        id: "container2",
        type: "container",
      }),
    ]
  );

  const parent = body.findParent("container4");

  expect(parent.data.id).toEqual('container1');

  const parent2 = body.findParent("blabla");
  
  expect(parent2).toBe(null)
});
