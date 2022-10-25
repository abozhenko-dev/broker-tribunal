import { Form } from "antd";

import { FileUpload } from "@components";

import { BrokersService } from "@services";

import { ONLY_IMAGES } from "@utils/constants";

export const Images = () => (
  <>
    <Form.Item label="Логотип" name="logo" rules={[{ required: true }]}>
      <FileUpload accept={ONLY_IMAGES} uploadRequest={BrokersService.uploadLogo} required />
    </Form.Item>
  </>
);
