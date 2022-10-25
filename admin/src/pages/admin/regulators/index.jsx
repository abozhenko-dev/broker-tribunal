import { useEffect, useState } from "react";

import {
  Button,
  Card,
  Checkbox,
  Divider,
  Image,
  Input,
  Segmented,
  Space,
  Spin,
  Table,
  Tag
} from "antd";
import dayjs from "dayjs";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { RemoveBoundary } from "@components";

import { RegulatorsService } from "@services";

import { useDebounce, useRequests, useUrlParams } from "@hooks";

import { LANGUAGES_KEYS, SORT } from "@utils/constants";

const Regulators = () => {
  // **Props
  const [params, hasParams, handleParams] = useUrlParams({
    defaultParams: {
      lang: LANGUAGES_KEYS[0],
      page: 1,
      size: 10,
      sortByDate: "",
      searchByName: "",
      searchBySlug: ""
    }
  });
  const [data, setData] = useState({});

  const debouncedNameValue = useDebounce(params.searchByName, 500);
  const debouncedSlugValue = useDebounce(params.searchBySlug, 500);

  // Routes
  const navigate = useNavigate();
  const create = () => navigate("/regulators/create");
  const edit = (id) => () => navigate(`/regulators/edit/${id}`);

  const { handleRequest, isLoading } = useRequests();

  const setInitials = handleRequest(async () => {
    const resp = await RegulatorsService.getAll({
      page: params.page,
      size: params.size,
      lang: params.lang,
      sortByDate: params.sortByDate ? params.sortByDate : null,
      searchByName: params.searchByName ? params.searchByName : null,
      searchBySlug: params.searchBySlug ? params.searchBySlug : null
    });

    if (resp.status !== 200) {
      throw resp;
    }

    setData((prevState) => ({
      ...prevState,
      [`${params.lang}`]: { ...resp?.data }
    }));
  });

  const handlePagination = (page, size) => {
    handleParams("page", page);
    handleParams("size", size);
  };

  // eslint-disable-next-line no-unused-vars
  const handleTableChange = (pagination, filters, sorter) => {
    handleParams("sortByDate", sorter.order ? SORT[sorter.order] : null);
  };

  const handleInput = (e, name, handler) => {
    handler(name, e.target.value);
  };

  useEffect(() => {
    if (!hasParams) return;

    setInitials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    params.lang,
    params.size,
    params.page,
    params.sortByDate,
    debouncedNameValue,
    debouncedSlugValue
  ]);

  useEffect(() => {
    if (debouncedNameValue) handleParams("searchByName", "");
    if (debouncedSlugValue) handleParams("searchBySlug", "");
    if (params.sortByDate) handleParams("sortByDate", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.lang]);

  return (
    <Card
      title="Регуляторы"
      extra={
        <Button type="primary" onClick={create}>
          Добавить
        </Button>
      }
    >
      <Spin spinning={!hasParams}>
        <Space size="large" direction="vertical" style={{ display: "flex" }}>
          <Space size="small" split={<Divider type="vertical" />}>
            <Segmented
              size="large"
              value={params.lang}
              options={LANGUAGES_KEYS}
              onChange={(value) => handleParams("lang", value)}
            />
          </Space>
          <Table
            dataSource={data[params.lang]?.data}
            bordered
            loading={isLoading}
            onChange={handleTableChange}
            pagination={{
              current: +params.page,
              pageSize: +params.size,
              total: data[params.lang]?.total,
              pageSizeOptions: [5, 10, 20, 50],
              showSizeChanger: true,
              position: "bottom-right",
              onChange: handlePagination
            }}
            rowKey="_id"
            size="middle"
            scroll={{
              x: 1300
            }}
          >
            <Table.Column
              title="Индексация"
              dataIndex={["meta", "noIndex"]}
              width={80}
              ellipsis
              align="center"
              render={(value) => <Checkbox checked={!value} />}
            />
            <Table.Column
              align="center"
              title="Дата основания"
              dataIndex="foundingDate"
              width={150}
              render={(value) => dayjs(value).format("DD MMM YYYY")}
              sorter
              sortDirections={["descend", "ascend"]}
              defaultSortOrder="descend"
            />
            <Table.Column
              align="center"
              title="Лого"
              dataIndex="logo"
              width={100}
              render={(logo) => (
                <Image
                  width={50}
                  height={50}
                  src={`${process.env.REACT_APP_BUCKET_URL}/${logo?.link}`}
                  alt={logo?.meta.alt}
                  style={{
                    objectFit: "cover",
                    backgroundColor: "transparent"
                  }}
                />
              )}
            />
            <Table.Column
              title="Имя"
              dataIndex="name"
              ellipsis
              filterDropdown={() => (
                <div
                  style={{
                    padding: 8
                  }}
                >
                  <Input
                    placeholder="Начните вводить заголовок"
                    value={params.searchByName}
                    onInput={(e) => handleInput(e, "searchByName", handleParams)}
                  />
                </div>
              )}
              filterIcon={() => <AiOutlineSearch fill={params.searchByName ? "#1890ff" : ""} />}
            />
            <Table.Column title="Юрисдикция" dataIndex="jurisdiction" ellipsis />
            <Table.Column
              title="Рейтинг"
              dataIndex="rating"
              align="center"
              ellipsis
              render={(record) => <Tag color="gold">{record}</Tag>}
            />
            <Table.Column
              title="Мин. депозит"
              dataIndex="minDeposit"
              align="center"
              ellipsis
              render={(record) => <Tag color="gold">{record}</Tag>}
            />
            <Table.Column
              key="slug"
              title="ЧПУ(url)"
              dataIndex="slug"
              ellipsis
              filterDropdown={() => (
                <div
                  style={{
                    padding: 8
                  }}
                >
                  <Input
                    placeholder="Начните вводить заголовок"
                    value={params.searchBySlug}
                    onInput={(e) => handleInput(e, "searchBySlug", handleParams)}
                  />
                </div>
              )}
              filterIcon={() => <AiOutlineSearch fill={params.searchBySlug ? "#1890ff" : ""} />}
            />
            <Table.Column
              width={120}
              title="Действия"
              dataIndex="actions"
              align="center"
              fixed="right"
              render={(_, record) => (
                <Space size={5} split={<Divider type="vertical" />}>
                  <Button
                    type="primary"
                    icon={<AiOutlineEdit />}
                    size="middle"
                    title="Редактирование рейтинга"
                    onClick={edit(record?._id)}
                  />
                  <RemoveBoundary
                    onSuccess={() => setInitials()}
                    handler={() => RegulatorsService.delete(record._id)}
                  >
                    <Button
                      danger
                      icon={<AiOutlineDelete />}
                      size="middle"
                      title="Удаление записи"
                    />
                  </RemoveBoundary>
                </Space>
              )}
            />
          </Table>
        </Space>
      </Spin>
    </Card>
  );
};

export default Regulators;
