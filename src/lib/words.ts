const numberToWordMap: { [key: number]: string } = {
  1: 'One',
  2: 'Two',
  3: 'Three',
  4: 'Four',
  5: 'Five',
  6: 'Six',
  7: 'Seven',
  8: 'Eight',
  9: 'Nine',
  10: 'Ten'
};

export function numberToWord(num: number): string {
  return numberToWordMap[num] || num.toString();
}
