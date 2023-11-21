import { calculate, generateAlignedStrings } from "@/calculations/calculation";
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
  const table = calculate({
    s1: first,
    s2: second,
    penalty: gapPenalty,
    algo: algoType,
    matrix: matrixType,
  });

  const result = generateAlignedStrings({
    s1: first,
    s2: second,
    tracebackMatrix: table.tracebackMatrix,
    maxI: first.length,
    maxJ: second.length,
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
              <div key={1} className="w-10 h-10 text-center align-middle p-2">
                {char}
              </div>
            ))}
          </Col>
          {table.scoreMatrix.map((row, rowIndex) => (
            <Col key={rowIndex}>
              <div
                key={rowIndex}
                className="w-10 h-10 text-center align-middle p-2"
              >
                {rowIndex !== 0 ? first[rowIndex - 1] : "/"}
              </div>
              {row.map((cell, cellIndex) => (
                <>
                  <div
                    key={cellIndex}
                    className={`w-10 h-10 text-center align-middle border-["#d9d9d9"] border-[1px] p-2 rounded-xl`}
                  >
                    {cell}
                  </div>
                </>
              ))}
            </Col>
          ))}
        </Row>
      </div>
      {first.length > 0 && second.length > 0 && (
        <div className="flex flex-col">
          <Statistic
            title="Харьцуулалтын оноо"
            value={table.scoreMatrix[first.length][second.length]}
          />
          <Statistic title="Харьцуулалт" value={result.alignedS1} />
          <Statistic value={result.alignedS2} />
        </div>
      )}
    </div>
  );
};
