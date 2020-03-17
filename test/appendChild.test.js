const TreeNode = require('../lib').default

test('appendChild', () => {
  const body = new TreeNode({
    id: 'blabla',
    type: 'body'
  })

  const container1 = new TreeNode({
    id: 'container1',
    type: 'container'
  })

  const container2 = new TreeNode({
    id: 'container2',
    type: 'container'
  })

  const container3 = new TreeNode({
    id: 'container2',
    type: 'container'
  })

  body.appendChild(container1)
  body.appendChild(container2)

  container1.appendChild(container3)

  const t = new TreeNode({
    id: 'blabla',
    type: 'body'
  }, [
    new TreeNode({
      id: 'container1',
      type: 'container'
    }, [
      new TreeNode({
        id: 'container2',
        type: 'container'
      })
    ]),
    new TreeNode({
      id: 'container2',
      type: 'container'
    })
  ])

  expect(body).toEqual(t)
})