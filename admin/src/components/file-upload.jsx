import { useEffect, useRef, useState } from "react";

import { Image as AntImage, Button, Form, Input, Space, Table, Upload } from "antd";
import { AiOutlineDelete } from "react-icons/ai";

import { BucketService } from "@services";

import { useRequests } from "@hooks";

import { getMediaDimensions } from "@utils/helpers";

import { RemoveBoundary } from "./remove-boundary";

const EditableCell = (props) => {
  // **Props
  const { editable, children, dataIndex, value: defaultValue, record, saveCell, ...rest } = props;

  // **Local state
  const [value, setValue] = useState(defaultValue);
  const [editing, setEditing] = useState(false);
  let childNode = children;

  // **Ref
  const inputRef = useRef(null);

  const toggleEdit = () => {
    setEditing(!editing);
  };

  const save = () => {
    try {
      toggleEdit();

      saveCell({
        ...record,
        meta: {
          ...record.meta,
          [dataIndex]: value
        }
      });
    } catch (errInfo) {
      // eslint-disable-next-line no-console
      console.log("Save failed:", errInfo);
    }
  };

  if (editable && editing) {
    childNode = (
      <Input
        ref={inputRef}
        value={value}
        onInput={(e) => setValue(e.target.value)}
        onPressEnter={save}
        onBlur={save}
      />
    );
  }

  if (editable && !editing) {
    childNode = (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  useEffect(() => {
    if (!editing) return;
    inputRef.current.focus();
  }, [editing]);

  return <td {...rest}>{childNode}</td>;
};

export const FileUpload = ({ onChange, value = [], uploadRequest, required, ...rest }) => {
  // **Local state
  const [isChange, setIsChange] = useState(false);
  const [isSet, setIsSet] = useState(false);
  const [file, setFile] = useState([]);

  const form = Form.useFormInstance();

  const { handleRequest } = useRequests();
  const { handleRequest: handleUploadRequest, isLoading } = useRequests();

  const saveCell = handleRequest(async (row) => {
    const resp = await BucketService.updateFile(row._id, {
      link: row.link,
      meta: row.meta
    });

    if (resp.status !== 200) {
      throw resp;
    }

    setFile((prev) => [{ ...prev[0], meta: row.meta }]);
  });

  const handleUpload = handleUploadRequest(async ({ file: newFile }) => {
    let change = false;

    if (file.length !== 0) {
      await BucketService.deleteFile(file[0]._id);
      change = true;
    }

    const { width, height } = await getMediaDimensions(newFile);

    const formData = new FormData();

    formData.append("file", newFile);
    formData.append("width", width);
    formData.append("height", height);

    const resp = await uploadRequest(formData);

    if (resp.status !== 200) {
      throw resp;
    }

    setFile([resp.data]);

    if (change) {
      setIsChange(true);
    }
  });

  // UseEffect for initial setting the file state (ONLY FOR EDITING)
  useEffect(() => {
    // Check if value contains values inside, first value is not string and the value has already been set
    if (!value?.length || typeof value[0] === "string" || isSet) return;

    setFile(value);
    setIsSet(true);
  }, [value, isSet]);

  // Setting current values to FORM
  useEffect(() => {
    if (file.length === 0) {
      onChange(null);
      return;
    }

    onChange(file[0]._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  useEffect(() => {
    if (!isChange) return;

    form.submit();

    setIsChange(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChange]);

  return (
    <Space size={16} style={{ display: "flex" }} direction="vertical">
      <Space size={32}>
        <Upload
          onChange={handleUpload}
          beforeUpload={() => false}
          showUploadList={false}
          fileList={[]}
          maxCount={1}
          {...rest}
        >
          <Button loading={isLoading}>
            {file.length === 0 ? "Выбрать файл" : "Заменить файл"}
          </Button>
        </Upload>
      </Space>

      {file.length !== 0 && (
        <Table
          components={{
            body: {
              cell: EditableCell
            }
          }}
          rowClassName={() => "editable-row"}
          dataSource={file}
          bordered
          pagination={false}
          rowKey="_id"
          size="small"
          scroll={{
            x: 1000
          }}
        >
          <Table.Column
            title="Превью"
            dataIndex="link"
            align="center"
            width={110}
            ellipsis
            render={(value) => (
              <AntImage
                width={100}
                height={100}
                src={`${process.env.REACT_APP_BUCKET_URL}/${value}`}
                placeholder
                style={{
                  objectFit: "contain",
                  backgroundColor: "transparent"
                }}
              />
            )}
          />
          <Table.Column
            title="Alt"
            width={300}
            dataIndex="alt"
            ellipsis
            onCell={(record) => ({
              record,
              editable: true,
              dataIndex: "alt",
              value: record?.meta?.alt,
              saveCell
            })}
            render={(_, record) => record?.meta?.alt}
          />
          <Table.Column
            title="Title"
            width={300}
            dataIndex="title"
            ellipsis
            onCell={(record) => ({
              record,
              editable: true,
              dataIndex: "title",
              value: record?.meta?.title,
              saveCell
            })}
            render={(_, record) => record?.meta?.title}
          />
          {!required && (
            <Table.Column
              width={80}
              title="Действия"
              dataIndex="actions"
              align="center"
              render={(_, record) => (
                <RemoveBoundary
                  handler={() => BucketService.deleteFile(record._id)}
                  onSuccess={() => setFile([])}
                >
                  <Button danger icon={<AiOutlineDelete />} size="middle" title="Удаление записи" />
                </RemoveBoundary>
              )}
            />
          )}
        </Table>
      )}
    </Space>
  );
};
