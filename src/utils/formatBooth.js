export function getBoothMarks({ isVegan, isEco }) {
  return [isVegan && 'vegan', isEco && 'eco'].filter(Boolean);
}

export function marksToFlags(marks) {
  return { isVegan: marks.includes('vegan'), isEco: marks.includes('eco') };
}
