import { findIndex } from './utils'

export interface TreeNodeBase {
  id: string
}

class TreeNode<T extends TreeNodeBase> {

  constructor(public data: T, public children = [] as TreeNode<T>[]) {

  }

  // copy a tree
  static copy<T extends TreeNodeBase>(node: TreeNode<T>) {
    function c (n: TreeNode<T>) {
      return new TreeNode(n.data, n.children.map(_ => c(_)))
    }
    return c(node)
  }

  appendChild(node: TreeNode<T>) {
    this.children.push(node)
  }

  prependChild(node: TreeNode<T>) {
    this.children.unshift(node)
  }

  bfs(id: string, cb: (n: TreeNode<T>) => void) {
    if (this.data.id === id) {
      cb(this)
      return
    }

    let queue = [...this.children]

    while(queue.length) {
      const n = queue.shift() as TreeNode<T>
      if (n.data.id === id) {
        cb(n)
        return
      } else {
        queue = [...queue, ...n.children]
      }
    }
  }

  appendTo(id: string, node: TreeNode<T>) {
    this.bfs(id, (n) => {
      n.appendChild(node)
    })
  }

  prependTo(id: string, node: TreeNode<T>) {
    this.bfs(id, (n) => {
      n.prependChild(node)
    })
  }

  exchange(idA: string, idB: string) {
    let count = 2
    let queue = [...this.children]

    let a: TreeNode<T>, b: TreeNode<T>

    while(queue.length && count > 0) {
      const n = queue.shift() as TreeNode<T>
      if (n.data.id === idA) {
        a = n
        count--
      } else if (n.data.id === idB) {
        b = n
        count--
      } else {
        queue = [...queue, ...n.children]
      }
    }

    // @ts-ignore
    if (!a || !b) {
      return false
    } else {
      const dataA = a.data
      a.data = b.data
      b.data = dataA
      return true
    }
  }

  insertBefore(id: string, node: TreeNode<T>) {
    let queue = [this as TreeNode<T>]

    while(queue.length) {
      const n = queue.shift() as TreeNode<T>

      const index =  findIndex(n.children, _ => _.data.id === id)
      if (index !== -1) {
        n.children.splice(index, 0, node)
      } else {
        queue = [...queue, ...n.children]
      }
    }
  }

  insertAfter(id: string, node: TreeNode<T>) {
    let queue = [this as TreeNode<T>]

    while(queue.length) {
      const n = queue.shift() as TreeNode<T>
      const index = findIndex(n.children, _ => _.data.id === id)
      if (index !== -1) {
        n.children.splice(index + 1, 0, node)
      } else {
        queue = [...queue, ...n.children]
      }
    }
  }

  remove(id: string) {
    let queue = [this as TreeNode<T>]
    while(queue.length) {
      const n = queue.shift() as TreeNode<T>
      const index = findIndex(n.children, _ => _.data.id === id)
      if (index !== -1) {
        return n.children.splice(index, 1)[0]
      } else {
        queue = [...queue, ...n.children]
      }
    }
  }

  toString() {
    return JSON.stringify(this, null, 4)
  }

  serialize() {
    return this
  }
}

export default TreeNode