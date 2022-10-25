import { Form } from "antd";

import { FileUpload } from "@components";

import { OverviewsService } from "@services";

import { ONLY_IMAGES } from "@utils/constants";

export const Images = () => (
  <>
    <Form.Item label="Логотип" name="logo" rules={[{ required: true }]}>
      <FileUpload accept={ONLY_IMAGES} uploadRequest={OverviewsService.uploadLogo} required />
    </Form.Item>
  </>
);
