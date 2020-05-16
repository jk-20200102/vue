export function getRandomSubarray(arr: [], size: number) {
  
  let shuffled = arr.slice(0)
  let i = arr.length
  let temp, index

  while (i--) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }

  return shuffled.slice(0, size);
}

/**
 * from, to 사이의 난수를 반환
 */
export function getRandomValue(from: number, to: number) {

  if (from === to) return from

  return Math.floor((to + 1 - from) * Math.random()) + from
}
