// 투 포인터 정리
// 양 끝에서 좁혀오는 투 포인터
// 두 수의 합 문제
// 두 개 뽑아서 더하기 : gpt가 추천했지만 gpt가 적합하지 않다고 함 이게 뭐지...
function twoSum(numbers) {
  numbers.sort((a, b) => a - b); // 정렬

  let left = 0;
  let right = numbers.length - 1;

  const results = new Set();

  while (left < right) {
    const sum = numbers[left] + numbers[right];

    results.add(sum);

    if (right === left + 1) {
      left++;
      right = numbers.length - 1;
    } else {
      right--;
    }
  }

  console.log("결과", results);
  console.log(
    "결과 정렬",
    [...results].sort((a, b) => a - b)
  );
}

twoSum([2, 1, 3, 4, 1]);
twoSum([5, 0, 2, 7]);

// 두 용액
function twoLiquid(arr) {
  arr.sort((a, b) => a - b); // 정렬
  console.log("정렬 ", arr);

  let left = 0;
  let right = arr.length - 1;

  let sum = Infinity;
  const answer = [];

  while (left < right) {
    const curSum = arr[left] + arr[right];

    if (Math.abs(curSum) < Math.abs(sum)) {
      sum = curSum;
      answer[0] = arr[left];
      answer[1] = arr[right];
    }

    if (curSum > 0) left++;
    else right--;
  }

  console.log(answer);
}

twoLiquid([-2, 4, -99, 1, 98]);

// 삼총사 문제
const threeSum = (nums) => {
  console.log("입력값", nums);

  // 정렬
  nums.sort((a, b) => a - b);
  console.log("정렬 후", nums);

  let count = 0;

  const set = new Set();

  let left = 0;
  let right = nums.length - 1;

  for (let i = 0; i < nums.length - 2; i++) {
    left = i + 1;
    right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        if (!set.has(`${nums[i]}-${nums[left]}-${nums[right]}`)) {
          count++;
          set.add(`${nums[i]}-${nums[left]}-${nums[right]}`);
        }
      }

      if (sum <= 0) left++;
      else right--;
    }
  }

  console.log("결과", count);
};

threeSum([-2, 3, 0, 2, -5]);
threeSum([-3, -2, -1, 0, 1, 2, 3]);
threeSum([-1, 1, -1, 1]);
