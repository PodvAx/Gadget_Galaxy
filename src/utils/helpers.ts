export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export const getPaginationRange = (
  totalPages: number,
  currentPage: number,
  siblingCount = 1,
) => {
  const totalPageNumbers = siblingCount * 2 + 5;

  if (totalPageNumbers >= totalPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const showLeftDots = leftSiblingIndex > 2;
  const showRightDots = rightSiblingIndex < totalPages - 1;

  const pagination: (number | string)[] = [];

  pagination.push(1);

  if (showLeftDots) {
    pagination.push('...');
  }

  const left = showLeftDots ? leftSiblingIndex : 2;
  const right = showRightDots ? rightSiblingIndex : totalPages - 1;

  for (let i = left; i <= right; i++) {
    pagination.push(i);
  }

  if (showRightDots) {
    pagination.push('...');
  }

  if (totalPages > 1) {
    pagination.push(totalPages);
  }

  return pagination;
};
