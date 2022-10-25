import { Form } from "antd";

import { FileUpload } from "@components";

import { NewsService } from "@services";

import { ONLY_IMAGES } from "@utils/constants";

export const Images = () => (
  <>
    <Form.Item label="Постер" name="poster" rules={[{ required: true }]}>
      <FileUpload accept={ONLY_IMAGES} uploadRequest={NewsService.uploadPoster} required />
    </Form.Item>
  </>
);
