import { Col, Input, InputNumber, Radio, Row, Typography } from "antd";
import { ApiOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ResultMatrix } from "@/components/ResultMatrix";

export enum AlgoType {
  LOCAL = "LOCAL",
  GLOBAL = "GLOBAL",
}

export enum MatrixType {
  BLOSUM62 = "BLOSUM62",
  PAM40 = "PAM40",
}

function Home() {
  const [first, setFirst] = useState<string>("");
  const [second, setSecond] = useState<string>("");
  const [matrix, setMatrix] = useState<MatrixType>(MatrixType.BLOSUM62);
  const [type, setType] = useState<AlgoType>(AlgoType.GLOBAL);
  const [penalty, setPenalty] = useState<number>(-6);
  return (
    <Row gutter={[24, 24]}>
      <Col span={8}>
        <div className="flex flex-col gap-5">
          <div>
            <Typography.Title level={5}>1-р дараалал</Typography.Title>
            <Input
              placeholder="CCADBD..."
              prefix={<ApiOutlined />}
              onChange={(e) => setFirst(e.target.value.toUpperCase())}
            />
          </div>
          <div>
            <Typography.Title level={5}>2-р дараалал</Typography.Title>
            <Input
              placeholder="AABCDDA..."
              prefix={<ApiOutlined />}
              onChange={(e) => setSecond(e.target.value.toUpperCase())}
            />
          </div>
          <div>
            <Typography.Title level={5}>Харьцуулалтын төрөл</Typography.Title>
            <Radio.Group
              onChange={(e) => setType(e.target.value)}
              defaultValue={type}
            >
              <Radio.Button value={AlgoType.GLOBAL}>
                Needleman-Wunsch
              </Radio.Button>
              <Radio.Button value={AlgoType.LOCAL} disabled={true}>
                Smith-Waterman
              </Radio.Button>
            </Radio.Group>
          </div>
          <div>
            <Typography.Title level={5}>Орлуултын матриц</Typography.Title>
            <Radio.Group
              onChange={(e) => setType(e.target.value)}
              defaultValue={matrix}
            >
              <Radio.Button value={MatrixType.BLOSUM62}>BLOSUM62</Radio.Button>
              <Radio.Button value={MatrixType.PAM40} disabled={true}>
                PAM40
              </Radio.Button>
            </Radio.Group>
          </div>
          <div>
            <Typography.Title level={5}>
              Хоосон зайн шугаман торгууль
            </Typography.Title>
            <InputNumber
              min={-15}
              max={0}
              defaultValue={penalty}
              onChange={(v) => {
                if (v) {
                  setPenalty(v);
                }
              }}
            />
          </div>
        </div>
      </Col>
      <Col span={16}>
        <Typography.Title level={5} className="text-center">
          Үр дүнгийн матриц
        </Typography.Title>
        <ResultMatrix
          first={first}
          second={second}
          gapPenalty={penalty}
          algoType={type}
          matrixType={matrix}
        />
      </Col>
    </Row>
  );
}

export default Home;
