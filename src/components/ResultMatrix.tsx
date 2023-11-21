import { calculate } from "@/calculations/calculation";
import { Blosum62 } from "@/calculations/matrix";
import { AlgoType, MatrixType } from "@/pages";
import { Col, Row, Statistic } from "antd";
import React from "react";

export const ResultMatrix = ({
  first,
  second,
  matrixType,
  algoType,
  gapPenalty,
}: {
  first: string;
  second: string;
  matrixType: MatrixType;
  algoType: AlgoType;
  gapPenalty: number;
}) => {
  const table: number[][] = calculate({
    s1: first,
    s2: second,
    penalty: gapPenalty,
    algo: algoType,
    matrix: matrixType,
  });

  return (
    <div className="w-full border-[#d9d9d9] border-2 p-10 flex justify-between rounded-xl">
      <div>
        <Row gutter={[8, 8]}>
          <Col>
            <div key={1} className="w-10 h-10 text-center align-middle" />
            <div key={1} className="w-10 h-10 text-center align-middle">
              /
            </div>
            {second.split("").map((char, index) => (
              <div key={1} className="w-10 h-10 text-center align-middle">
                {char}
              </div>
            ))}
          </Col>
          {table.map((row, rowIndex) => (
            <Col key={rowIndex}>
              <div
                key={rowIndex}
                className="w-10 h-10 text-center align-middle"
              >
                {rowIndex !== 0 ? first[rowIndex - 1] : "/"}
              </div>
              {row.map((cell, cellIndex) => (
                <>
                  <div
                    key={cellIndex}
                    className="w-10 h-10 text-center align-middle border-[#d9d9d9] border-2 rounded-xl"
                  >
                    {cell}
                  </div>
                </>
              ))}
            </Col>
          ))}
        </Row>
      </div>
      <div className="flex">
        <Statistic
          title="Харьцуулалтын оноо"
          value={table[first.length][second.length]}
        />
      </div>
    </div>
  );
};
