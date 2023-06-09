import React, { useState } from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';

import { WidgetProps } from '~/src/ui/shared/forms/FormBuilder/FormBuilder';
import logger from '~/src/utils/logger';

interface UploadButtonProps extends WidgetProps {
  actionUpload?: any;
}

const UploadButton: React.FC<Partial<UploadButtonProps>> = (props) => {
  const { onChange, value, actionUpload } = props;
  const [loading, setLoading] = useState(false);

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload file with format JPG/PNG!');
    }
    return isJpgOrPng;
  };

  const uploadButton = (
    <div>
      {loading ? (
        <LoadingOutlined />
      ) : (
        <span className="anticon anticon-camera" role="img" aria-label="camera">
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            data-icon="camera"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M864 260H728l-32.4-90.8a32.07 32.07 0 00-30.2-21.2H358.6c-13.5 0-25.6 8.5-30.1 21.2L296 260H160c-44.2 0-80 35.8-80 80v456c0 44.2 35.8 80 80 80h704c44.2 0 80-35.8 80-80V340c0-44.2-35.8-80-80-80zM512 716c-88.4 0-160-71.6-160-160s71.6-160 160-160 160 71.6 160 160-71.6 160-160 160zm-96-160a96 96 0 10192 0 96 96 0 10-192 0z"></path>
          </svg>
        </span>
      )}
    </div>
  );

  const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      logger.debug('uploading!');
      return;
    }

    if (info.file.status === 'done') {
      setLoading(false);
      logger.debug('uploaded!', info.file);

      const urlFile: string = info.file.response?.data?.url;

      if (urlFile) {
        logger.debug('urlFile | uploaded', urlFile);
        onChange && onChange(urlFile);
      } else {
        message.error(
          `${info.file.name} file uploaded failed | error: ${info.file.response?.data?.detail || 'Something went wrong'
          }`
        );
        return;
      }
    }

    if (info.file.status === 'error') {
      logger.debug('error', info.file);
      setLoading(false);
      message.error(`${info.file.name} file upload failed`);
    }
  };

  const headerConfig: any = {};
  return (
    <Upload
      accept="image/*"
      name="file"
      listType="picture-card"
      showUploadList={false}
      action={actionUpload}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      withCredentials={false}
      headers={headerConfig}
      disabled={props?.disabled}
    >
      {value ? <img src={value} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      {/* {uploadButton} */}
    </Upload>
  );
};

export default UploadButton;
