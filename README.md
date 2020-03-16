# tree-util

A library for working with n-ary tree.

[![Build Status](https://travis-ci.org/djyde/tree-util.svg?branch=master)](https://travis-ci.org/djyde/tree-util)

## Install

```bash
npm i @djyde/tree-util
```

## Usage

```ts
import TreeNode from '@djyde/tree-util'
// or commonjs
const TreeNode = require('@djyde/tree-util').default

const root = new TreeNode({
  // id is required and should be unique
  id: 'root'
}, [
  new TreeNode({ id: 'foo' }),
  new TreeNode({ id: 'bar' }),
])

// append a child in the node which id is equal to `foo`
root.appendChild('foo', new TreeNode({ id: 'new node' }))
```

See more example on `test/index.test.js`

## APIs

```ts
declare class TreeNode<T extends TreeNodeBase> {
    data: T;

    children: TreeNode<T>[];

    constructor(data: T, children?: TreeNode<T>[]);

    appendChild(node: TreeNode<T>): void;

    prependChild(node: TreeNode<T>): void;

    // search a node by id
    bfs(id: string, cb: (n: TreeNode<T>) => void): void;

    // append a child to node by id
    appendTo(id: string, node: TreeNode<T>): void;

    // prepend a child to node by id
    prependTo(id: string, node: TreeNode<T>): void;

    // exchange two node data by id
    exchange(idA: string, idB: string): boolean;

    // insert a node before a node by id
    insertBefore(id: string, node: TreeNode<T>): void;

    // insert a node after a node by id
    insertAfter(id: string, node: TreeNode<T>): void;

    // remove a node by id
    remove(id: string): TreeNode<T> | undefined;

    toString(): string;
}
```

# License

MIT License