const TreeNode = require("../lib").default;

test('fromJson', () => {
  const treeNodeLike = `
  {
  "data": {
    "type": "root",
    "id": "root"
  },
  "children": [
    {
      "data": {
        "type": "string",
        "id": "werqwer"
      },
      "children": []
    }
  ]
}
  `;

  const compare = new TreeNode({
    type: 'root',
    id: 'root'
  }, [
    new TreeNode({
      type: 'string',
      id: 'werqwer'
    })
  ])
  expect(TreeNode.fromJson(treeNodeLike)).toEqual(compare)
})