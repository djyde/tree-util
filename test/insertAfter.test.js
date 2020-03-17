const TreeNode = require('../lib').default

test('insert - after', () => {
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

  body.insertAfter('container3', new TreeNode({
    id: 'container5',
    type: 'container'
  }))

  const t = new TreeNode({
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
        id: 'container5',
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

  expect(body).toEqual(t)
})
