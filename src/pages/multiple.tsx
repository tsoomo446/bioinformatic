import { Button, Col, Form, Input, List, Row, Table } from "antd";
import React, { useState } from "react";
import { ApiOutlined, PlusOutlined } from "@ant-design/icons";
import { getPoint, globalAlignment } from "@/calculations/multiple";
import { title } from "process";

function MultiplePage() {
  const [sequences, setSequences] = useState<string[]>([
    "PPGVKSDCAS",
    "PADGVKDCAS",
    "PPDGKSDS",
  ]);
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    setSequences((arr) => [...arr, values.seq.toUpperCase()]);
    form.resetFields(["seq"]);
  };
  const alignmentResult = getPoint(sequences[0], sequences[1]);

  return (
    <Row gutter={[24, 24]}>
      <Col span={8}>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item label="Дараалал" name="seq">
            <Input placeholder="CCADBD..." prefix={<ApiOutlined />} />
          </Form.Item>
          <Form.Item>
            <Button
              type="default"
              htmlType="submit"
              icon={<PlusOutlined />}
              style={{ width: "100%" }}
            >
              Нэмэх
            </Button>
          </Form.Item>
        </Form>
        <List
          bordered
          dataSource={sequences}
          renderItem={(item, index) => (
            <List.Item>
              {index + 1}-р дараалал : {item}
            </List.Item>
          )}
        />
      </Col>
      <Col span={16}>
        <Table
          bordered
          pagination={false}
          columns={[
            { title: "Sequences", dataIndex: "seq", key: "empty" },
            ...sequences.map((col, index) => {
              return { title: col, dataIndex: index, key: index };
            }),
          ]}
          dataSource={sequences.map((seq, i) => {
            const row = { key: i.toString(), seq };
            sequences.forEach((_, j) => {
              row[j.toString() as keyof typeof row] = getPoint(
                seq,
                sequences[j]
              ).point.toString();
            });
            return row;
          })}
        />
      </Col>
    </Row>
  );
}

export default MultiplePage;
