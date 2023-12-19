import { AlgoType, MatrixType } from "@/pages";
import { Blosum62 } from "./matrix";

export const calculate = ({
  s1,
  s2,
  penalty,
  algo,
  matrix,
}: {
  s1: string;
  s2: string;
  penalty: number;
  algo: AlgoType;
  matrix: MatrixType;
}): {
  scoreMatrix: number[][];
  tracebackMatrix: string[][];
  solutionPath: { row: number; col: number }[];
} => {
  if (algo === AlgoType.GLOBAL) {
    return NeedlemanWunsch({ s1, s2, penalty, matrix });
  } else if (algo === AlgoType.LOCAL) {
    return SmithWaterman({ s1, s2, penalty, matrix });
  }
  return NeedlemanWunsch({ s1, s2, penalty, matrix });
};

const NeedlemanWunsch = ({
  s1,
  s2,
  penalty,
  matrix,
}: {
  s1: string;
  s2: string;
  penalty: number;
  matrix: MatrixType;
}): {
  scoreMatrix: number[][];
  tracebackMatrix: string[][];
  solutionPath: { row: number; col: number }[];
} => {
  const n = s1.length;
  const m = s2.length;

  const scoreMatrix: number[][] = [];
  const tracebackMatrix: string[][] = [];

  for (let i = 0; i <= n; i++) {
    scoreMatrix[i] = [];
    tracebackMatrix[i] = [];
    for (let j = 0; j <= m; j++) {
      scoreMatrix[i][j] = 0;
      tracebackMatrix[i][j] = "";
    }
  }

  for (let i = 1; i <= n; i++) {
    scoreMatrix[i][0] = scoreMatrix[i - 1][0] + penalty;
    tracebackMatrix[i][0] = "U";
  }

  for (let j = 1; j <= m; j++) {
    scoreMatrix[0][j] = scoreMatrix[0][j - 1] + penalty;
    tracebackMatrix[0][j] = "L";
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const match = scoreMatrix[i - 1][j - 1] + Blosum62[s1[i - 1]][s2[j - 1]];
      const deleteGap = scoreMatrix[i - 1][j] + penalty;
      const insertGap = scoreMatrix[i][j - 1] + penalty;

      if (match >= deleteGap && match >= insertGap) {
        scoreMatrix[i][j] = match;
        tracebackMatrix[i][j] = "D";
      } else if (deleteGap >= insertGap) {
        scoreMatrix[i][j] = deleteGap;
        tracebackMatrix[i][j] = "U";
      } else {
        scoreMatrix[i][j] = insertGap;
        tracebackMatrix[i][j] = "L";
      }
    }
  }
  let currentCell = { row: n, col: m };
  let solutionPath: { row: number; col: number }[] = [];
  // Perform the traceback operation
  while (scoreMatrix[currentCell.row][currentCell.col] !== 0) {
    solutionPath.push(currentCell);
    switch (tracebackMatrix[currentCell.row][currentCell.col]) {
      case "D":
        currentCell = { row: currentCell.row - 1, col: currentCell.col - 1 };
        break;
      case "L":
        currentCell = { row: currentCell.row, col: currentCell.col - 1 };
        break;
      case "U":
        currentCell = { row: currentCell.row - 1, col: currentCell.col };
        break;
    }
  }

  return { scoreMatrix, tracebackMatrix, solutionPath };
};

const SmithWaterman = ({
  s1,
  s2,
  penalty,
  matrix,
}: {
  s1: string;
  s2: string;
  penalty: number;
  matrix: MatrixType;
}): {
  scoreMatrix: number[][];
  tracebackMatrix: string[][];
  solutionPath: { row: number; col: number }[];
} => {
  const n = s1.length;
  const m = s2.length;
  const scoreMatrix: number[][] = [];
  const tracebackMatrix: string[][] = [];
  const solutionPath: { row: number; col: number }[] = [];

  for (let i = 0; i <= n; i++) {
    scoreMatrix[i] = [];
    tracebackMatrix[i] = [];
    for (let j = 0; j <= m; j++) {
      scoreMatrix[i][j] = 0;
      tracebackMatrix[i][j] = "";
    }
  }

  let maxScore = 0;
  let maxI = 0;
  let maxJ = 0;
  let currentCell = { row: 0, col: 0 };
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const match = scoreMatrix[i - 1][j - 1] + Blosum62[s1[i - 1]][s2[j - 1]];
      const deleteGap = Math.max(scoreMatrix[i - 1][j] + penalty, 0);
      const insertGap = Math.max(scoreMatrix[i][j - 1] + penalty, 0);

      scoreMatrix[i][j] = Math.max(match, deleteGap, insertGap);

      if (scoreMatrix[i][j] === match) {
        tracebackMatrix[i][j] = "D";
      } else if (scoreMatrix[i][j] === deleteGap) {
        tracebackMatrix[i][j] = "U";
      } else if (scoreMatrix[i][j] === insertGap) {
        tracebackMatrix[i][j] = "L";
      }
      if (scoreMatrix[i][j] > maxScore) {
        maxScore = scoreMatrix[i][j];
        maxI = i;
        maxJ = j;
        currentCell = { row: i, col: j };
      }
    }
  }

  // Perform the traceback operation
  while (scoreMatrix[currentCell.row][currentCell.col] !== 0) {
    solutionPath.push(currentCell);
    switch (tracebackMatrix[currentCell.row][currentCell.col]) {
      case "D":
        currentCell = { row: currentCell.row - 1, col: currentCell.col - 1 };
        break;
      case "L":
        currentCell = { row: currentCell.row, col: currentCell.col - 1 };
        break;
      case "U":
        currentCell = { row: currentCell.row - 1, col: currentCell.col };
        break;
    }
  }
  return { scoreMatrix, tracebackMatrix, solutionPath };
};

export const generateAlignedStrings = ({
  s1,
  s2,
  tracebackMatrix,
  maxI,
  maxJ,
}: {
  s1: string;
  s2: string;
  tracebackMatrix: string[][];
  maxI: number;
  maxJ: number;
}): { alignedS1: string; alignedS2: string } => {
  let alignedS1 = "";
  let alignedS2 = "";
  let i = maxI;
  let j = maxJ;

  while (i > 0 || j > 0) {
    switch (tracebackMatrix[i][j]) {
      case "D":
        alignedS1 = s1[i - 1] + alignedS1;
        alignedS2 = s2[j - 1] + alignedS2;
        i--;
        j--;
        break;
      case "U":
        alignedS1 = s1[i - 1] + alignedS1;
        alignedS2 = "-" + alignedS2;
        i--;
        break;
      case "L":
        alignedS1 = "-" + alignedS1;
        alignedS2 = s2[j - 1] + alignedS2;
        j--;
        break;
      default:
        break;
    }
  }

  return { alignedS1, alignedS2 };
};
