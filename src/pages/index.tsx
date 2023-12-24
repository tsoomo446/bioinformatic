import { Card, Col, Input, InputNumber, Radio, Row, Typography } from "antd";
import { ApiOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ResultMatrix } from "@/components/ResultMatrix";
import Link from "next/link";
import Image from "next/image";

export enum AlgoType {
  LOCAL = "LOCAL",
  GLOBAL = "GLOBAL",
}

export enum MatrixType {
  BLOSUM62 = "BLOSUM62",
  PAM40 = "PAM40",
}

function Home() {
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Link href={"/pair"}>
            <Card
              title="Хос дарааллын харьцуулалт"
              bordered={true}
              hoverable
              cover={
                <div className="relative w-full h-[200px]">
                  <Image
                    src={"/pairwise.png"}
                    fill
                    className="object-cover"
                    alt=""
                    loading="lazy"
                  />
                </div>
              }
            >
              Хос дараалал нь биоинформатикийн үндсэн арга бөгөөд ДНХ, РНХ эсвэл
              уургийн дараалал зэрэг биологийн хоёр дарааллын ижил төстэй ба
              ялгааг тодорхойлоход ашигладаг. Гол зорилго нь ижил төстэй бүс
              нутаг, функциональ элементүүдийг тодорхойлох боломжийг олгодог
              дарааллын тэмдэгтүүдийн хоорондох оновчтой уялдаа холбоог олох
              явдал юм.
            </Card>
          </Link>
        </Col>
        <Col span={12}>
          <Link href={"/multiple"}>
            <Card
              title="Олон дарааллын харьцуулалт"
              bordered={true}
              hoverable
              cover={
                <div className="relative w-full h-[200px]">
                  <Image
                    src={"/multiple.png"}
                    fill
                    className="object-cover"
                    alt=""
                    loading="lazy"
                  />
                </div>
              }
            >
              Multiple Sequence Alignment (MSA) нь гурав ба түүнээс дээш
              биологийн дарааллыг нэгэн зэрэг тохируулахад ашигладаг
              биоинформатикийн арга юм. Хос тэнхлэгээс ялгаатай нь MSA нь олон
              дарааллын хоорондох хувьслын хамаарлыг тооцдог бөгөөд хадгалагдсан
              бүс нутаг, функциональ элементүүд болон хувьслын үйл явдлын
              талаархи ойлголтыг өгдөг. MSA нь холбогдох дарааллын бүтцийн болон
              функциональ талыг ойлгоход маш чухал юм.
            </Card>
          </Link>
        </Col>
      </Row>
    </>
  );
}

export default Home;
