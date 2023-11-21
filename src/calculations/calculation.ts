import { AlgoType, MatrixType } from "@/pages";
import { Blosum62 } from "./matrix";
import { constants } from "fs";

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
}): number[][] => {
  if (algo === AlgoType.GLOBAL) {
    return NeedlemanWunsch({ s1, s2, penalty, matrix });
  } else if (algo === AlgoType.LOCAL) {
    return Smith({ s1, s2, penalty, matrix });
  }

  return [];
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
}): number[][] => {
  const n = s1.length;
  const m = s2.length;

  const scoreMatrix: number[][] = [];
  for (let i = 0; i <= n; i++) {
    scoreMatrix[i] = [];
    for (let j = 0; j <= m; j++) {
      scoreMatrix[i][j] = 0;
    }
  }

  for (let i = 1; i <= n; i++) {
    scoreMatrix[i][0] = scoreMatrix[i - 1][0] + penalty;
  }

  for (let j = 1; j <= m; j++) {
    scoreMatrix[0][j] = scoreMatrix[0][j - 1] + penalty;
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const match = scoreMatrix[i - 1][j - 1] + Blosum62[s1[i - 1]][s2[j - 1]];
      const deleteGap = scoreMatrix[i - 1][j] + penalty;
      const insertGap = scoreMatrix[i][j - 1] + penalty;
      scoreMatrix[i][j] = Math.max(match, deleteGap, insertGap);
    }
  }

  return scoreMatrix;
};

const Smith = ({
  s1,
  s2,
  penalty,
  matrix,
}: {
  s1: string;
  s2: string;
  penalty: number;
  matrix: MatrixType;
}): number[][] => {
  const n = s1.length;
  const m = s2.length;
  const scoreMatrix: number[][] = [];
  for (let i = 0; i <= n; i++) {
    scoreMatrix[i] = [];
    for (let j = 0; j <= m; j++) {
      scoreMatrix[i][j] = 0;
    }
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const match = scoreMatrix[i - 1][j - 1] + Blosum62[s1[i - 1]][s2[j - 1]];
      const deleteGap = Math.max(scoreMatrix[i - 1][j] + penalty, 0);
      const insertGap = Math.max(scoreMatrix[i][j - 1] + penalty, 0);

      scoreMatrix[i][j] = Math.max(match, deleteGap, insertGap);
    }
  }

  return scoreMatrix;
};
