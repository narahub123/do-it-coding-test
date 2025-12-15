// 이중 연결 리스트의 노드를 정의하는 클래스: 순서 관리
class Node {
  // 노드 생성 시 key, value를 받음 : 어떤 키가 언제 사용됐는지 추적하기 위한 수단
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null; // 이전 노드를 가리키는 포인터
    this.next = null; // 다음 노드를 가리키는 포인터
  }
}

// LRU 캐시 본체
class LRUCache {
  // 캐시 최대 용량을 받음
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map(); // key -> 노드를 빠르게 찾기 위한 해시맵 : 위치 찾기

    this.head = new Node(null, null); // 더미 노드
    this.tail = new Node(null, null); // 더미 노드
    // 실제 데이터는 head와 tail 사이에만 존재
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  // 특정 노드를 리스트에서 제거
  _remove(node) {
    node.prev.next = node.next; // 이전 노드의 next를 현재 노드의 next로 변경
    node.next.prev = node.prev; // 다음 노드의 prev를 현재 노드의 prev로 변경
  }

  // 노드를 가장 최근 사용(MRU) 위치로 이동
  _addToHead(node) {
    node.next = this.head.next; // 새 노드의 next는 head의 next
    node.prev = this.head; // 새 노드의 prev는 head
    this.head.next.prev = node; // 기존 첫번째 노드의 prev를 새 노드로 변경
    this.head.next = node; // head가 새 노드를 가리키도록 설정
  }

  // 값 조회: 조회 및 사용 처리
  get(key) {
    // 캐시가 없으면 -1 반환
    if (!this.map.has(key)) return -1;

    // key에 해당하는 노드를 가져옴
    const node = this.map.get(key);

    // 사용했으므로 가장 최근 위치로 이동
    this._remove(node);
    this._addToHead(node);

    return node.value;
  }

  // 값을 추가하거나 갱신
  put(key, value) {
    // 키가 이미 존재하는 경우
    if (this.map.has(key)) {
      // 기존 노드 가져오기
      const node = this.map.get(key);

      // 값 업데이트
      node.value = value;

      // 최신 사용 처리
      this._remove(node);
      this._addToHead(node);

      return;
    }

    // 새 key 추가
    // 새 노드 생성
    const newNode = new Node(key, value);
    // 맵에 추가
    this.map.set(key, newNode);
    // 가장 최근 사용 위치로 추가
    this._addToHead(newNode);

    // 용량 초과 처리(LRU 제거)
    if (this.map.size > this.capacity) {
      // 가장 오래 사용되지 않은 노드(tail 바로 앞 노드) => 이 부분 이해 못함
      const lru = this.tail.prev;
      // 가장 오래 사용되지 않은 노드 제거
      this._remove(lru);
      // 리스트에서 제거
      this.map.delete(lru.key);
    }
  }
}
