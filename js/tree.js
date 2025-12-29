// 트리 노드 클래스
class TreeNode {
  constructor(value) {
    this.value = value;
    this.children = [];
  }
}

// 트리 루트
const root = new TreeNode(1);
root.children.push(new TreeNode(2));
root.children.push(new TreeNode(3));

// 기본 메서드 연습
class Tree {
  constructor(value) {
    this.root = new TreeNode(value);
  }

  // 노드 추가 메서드
  insert(value, parentValue) {
    const parent = this.search(parentValue); // 부모 노드 찾기

    // 부모노드가 존재하면 자식 노드 추가
    if (parent) {
      parent.children.push(new TreeNode(value));
    } else {
      console.log("부모 노드를 찾을 수 없습니다.");
    }
  }

  // 노드 검색 메서드 (DFS)
  search(value, node = this.root) {
    if (node.value == value) return node; // 현재 노드가 찾는 값이면 반환

    for (let child of node.children) {
      const result = this.search(value, child); // 자식 노드에서 재귀 검색
      if (result) return result; // 찾으면 반환
    }
    return null; // 못 찾으면 null 반환
  }

  // 특정 값을 가진 노드 삭제 메서드
  // 자식 노드도 같이 삭제
  delete(value, node = this.root) {
    node.children = node.children.filter((child) => child.value !== value); // 현재 노드의 자식 노드 중 삭제 대상 필터링

    for (let child of node.children) {
      this.delete(value, child); // 자식 노드에서 재귀 삭제
    }
  }

  // 순회 메서드 (DFS)
  dfsTraverse(node = this.root) {
    console.log(node.value); // 현재 방문한 노드 출력
    for (let child of node.children) {
      this.dfsTraverse(child); // 자식 노드에서 재귀 순회
    }
  }

  // 순회 메서드 (bfs)
  bfsTraverse() {
    const queue = [this.root];

    while (queue.length > 0) {
      const node = queue.shift(); // 큐에서 꺼내기
      console.log(node.value);

      for (let child of node.children) {
        queue.push(child);
      }
    }
  }
}

const tree = new Tree(1);

// 노드 삽입
tree.insert(2, 1);
tree.insert(3, 1);
tree.insert(4, 2);
tree.insert(5, 2);
tree.insert(6, 3);

console.log("dfs 순회 : ");
tree.dfsTraverse();
console.log("bfs 순회 : ");
tree.bfsTraverse();

console.log("검색 : ");
console.log(tree.search(4));

tree.delete(2);
console.log("2를 삭제 한 후 dfs 조회");
tree.dfsTraverse();
console.log("2를 삭제 한 후 bfs 조회");
tree.bfsTraverse();
