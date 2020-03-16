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

test('appendTo', () => {
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

  body.appendTo('container4', new TreeNode({
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
        id: 'container4',
        type: 'container'
      }, [
        new TreeNode({
          id: 'container5',
          type: 'container'
        })
      ])
    ]),
    new TreeNode({
      id: 'container2',
      type: 'container'
    })
  ])

  expect(body).toEqual(t)
})

test('prependTo', () => {
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

  body.prependTo('container1', new TreeNode({
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
        id: 'container5',
        type: 'container'
      }),
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

  expect(body).toEqual(t)
})

test('exchange', () => {
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

  body.exchange('container3', 'container2')

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
      }),
      new TreeNode({
        id: 'container4',
        type: 'container'
      })
    ]),
    new TreeNode({
      id: 'container3',
      type: 'container'
    })
  ])

  expect(body).toEqual(t)
})

test('insert - before', () => {
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

  body.insertBefore('container2', new TreeNode({
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
        id: 'container4',
        type: 'container'
      })
    ]),
    new TreeNode({
      id: 'container5',
      type: 'container'
    }),
    new TreeNode({
      id: 'container2',
      type: 'container'
    })
  ])

  expect(body).toEqual(t)
})

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

test('remove and insert', () => {
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

  const container2 = body.remove('container2')
  body.insertBefore('container4', container2)

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
        id: 'container2',
        type: 'container'
      }),
      new TreeNode({
        id: 'container4',
        type: 'container'
      })
    ])
  ])

  expect(body).toEqual(t)
})