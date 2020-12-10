const TreeNode = require('../lib').default

test('copy', () => {
  const body = new TreeNode({
    id: 'blabla',
    type: 'body'
  }, [
    new TreeNode({
      id: 'container1',
      type: 'container'
    }, [
      new TreeNode({
        id: 'container3',
        type: 'container'
      }),
      new TreeNode({
        id: 'container4',
        type: 'container'
      })
    ]),
    new TreeNode({
      id: 'container2',
      type: 'container'
    })
  ])

  const newNode = TreeNode.copy(body)
  expect(newNode).not.toBe(body)
  expect(newNode).toEqual(newNode)
})

test("copy with replacer", () => {
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

  const compare = new TreeNode(
    {
      id: "blabla_",
      type: "body",
    },
    [
      new TreeNode(
        {
          id: "container1_",
          type: "container",
        },
        [
          new TreeNode({
            id: "container3_",
            type: "container",
          }),
          new TreeNode({
            id: "container4_",
            type: "container",
          }),
        ]
      ),
      new TreeNode({
        id: "container2_",
        type: "container",
      }),
    ]
  );

  const newNode = TreeNode.copy(body, (data) => {
    return {
      ...data,
      id: data.id + '_'
    }
  });
  expect(newNode).not.toBe(body);
  expect(newNode).toEqual(compare);
});