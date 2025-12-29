// 트라이 노드 클래스
class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false; // 단어(번호) 끝 표시
  }
}

// 트라이 클래스
class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  // 번호 삽입
  // 삽입 중 접두사 문제 발견 시 false 반환
  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) {
        node.children[ch] = new TrieNode();
      }
      node = node.children[ch];

      // 기존 번호가 새 번호의 접두사면 false
      if (node.isEnd) return false;
    }

    node.isEnd = true;

    // 새 번호가 기존 번호의 접두사면 false
    if (Object.keys(node.children).length > 0) return false;

    return true;
  }
}

// 솔루션 함수
function solution(phone_book) {
  const trie = new Trie();

  for (const number of phone_book) {
    if (!trie.insert(number)) {
      return false; // 접두사 문제 발생
    }
  }

  return true; // 문제 없으면 true
}

// 테스트
console.log(solution(["119", "97674223", "1195524421"])); // false
console.log(solution(["123", "456", "789"])); // true
console.log(solution(["12", "123", "1235", "567", "88"])); // false
