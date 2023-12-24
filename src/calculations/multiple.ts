export const globalAlignment = (seq1: string, seq2: string): string[] => {
  const gapPenalty = -1; // Penalty for introducing a gap
  const matchScore = 1; // Score for a match
  const mismatchPenalty = -1; // Penalty for a mismatch

  // Initialize the scoring matrix
  const matrix: number[][] = [];
  for (let i = 0; i <= seq1.length; i++) {
    matrix[i] = [];
    for (let j = 0; j <= seq2.length; j++) {
      matrix[i][j] = 0;
    }
  }

  // Fill in the scoring matrix
  for (let i = 1; i <= seq1.length; i++) {
    for (let j = 1; j <= seq2.length; j++) {
      const match =
        matrix[i - 1][j - 1] +
        (seq1[i - 1] === seq2[j - 1] ? matchScore : mismatchPenalty);
      const deleteGap = matrix[i - 1][j] + gapPenalty;
      const insertGap = matrix[i][j - 1] + gapPenalty;

      matrix[i][j] = Math.max(match, deleteGap, insertGap);
    }
  }

  // Traceback to find the aligned sequences
  let i = seq1.length;
  let j = seq2.length;
  const alignedSeq1: string[] = [];
  const alignedSeq2: string[] = [];

  while (i > 0 || j > 0) {
    if (
      i > 0 &&
      j > 0 &&
      matrix[i][j] ===
        matrix[i - 1][j - 1] +
          (seq1[i - 1] === seq2[j - 1] ? matchScore : mismatchPenalty)
    ) {
      alignedSeq1.unshift(seq1[i - 1]);
      alignedSeq2.unshift(seq2[j - 1]);
      i--;
      j--;
    } else if (i > 0 && matrix[i][j] === matrix[i - 1][j] + gapPenalty) {
      alignedSeq1.unshift(seq1[i - 1]);
      alignedSeq2.unshift("-");
      i--;
    } else {
      alignedSeq1.unshift("-");
      alignedSeq2.unshift(seq2[j - 1]);
      j--;
    }
  }
  return [alignedSeq1.join(""), alignedSeq2.join("")];
};

export const getPoint = (
  s1: string,
  s2: string
): { point: number; result: string[] } => {
  let match = 0;
  let not_gap = 0;
  const result = globalAlignment(s1, s2);
  for (let i = 0; i < result[0].length; i++) {
    if (result[0][i] !== "-" && result[1][i] !== "-") {
      not_gap++;
    } else {
      continue;
    }
    if (result[0][i] === result[1][i]) {
      match++;
      continue;
    }
  }
  let hasah = match / not_gap;
  return { point: Number((1 - hasah).toFixed(2)), result };
};
