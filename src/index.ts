import { findIndex } from './utils'

export interface TreeNodeBase {
  id: string
}

class TreeNode<T extends TreeNodeBase> {

  constructor(public data: T, public children = [] as TreeNode<T>[]) {

  }

  // copy a tree
  static copy<T extends TreeNodeBase>(node: TreeNode<T>, replacer?: (data: T) => T): TreeNode<T> {
    return new TreeNode<T>(replacer ? replacer(node.data) : node.data, node.children.map(_ => TreeNode.copy<T>(_, replacer)))
  }

  // convert a TreeNode like json string to TreeNode
  static fromJson<T extends TreeNodeBase>(jsonString: string): TreeNode<T> {
    const parsed = JSON.parse(jsonString) as TreeNode<T>
    return TreeNode.copy(parsed)
  }

  appendChild(node: TreeNode<T>) {
    this.children.push(node)
  }

  prependChild(node: TreeNode<T>) {
    this.children.unshift(node)
  }

  findParent(id: string) {
    if (this.data.id === id) {
      return null
    }

    if (findIndex(this.children, (n => n.data.id === id)) !== -1) {
      return this
    } else {
      for (let i = 0; i < this.children.length; i++) {
        if (this.children[i].findParent(id)) {
          return this.children[i]
        }
      }

      return null;
    }
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