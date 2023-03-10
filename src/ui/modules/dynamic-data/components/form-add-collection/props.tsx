import React from 'react';

import { MAP_STATE_STATUS } from '~/src/constant';
import { API_UPLOAD_IMAGE } from '~/src/constant/api';
import Editor from '~/src/ui/shared/editor';
import UploadButton from '~/src/ui/shared/upload';

export const metaFormAddCollection = ({ categories }) => {
  return {
    formItemLayout: [2, 20],
    fields: [
      {
        key: 'thumbnail',
        label: 'Thumbnail',
        required: true,
        message: 'Vui lòng upload Thumbnail',
        widget: UploadButton,
        widgetProps: {
          api: API_UPLOAD_IMAGE,
        },
      },
      {
        key: 'title',
        label: 'Title',
        required: true,
        message: 'Vui lòng nhập title',
      },
      {
        key: "description",
        label: "Description",
        message: "Vui lòng nhập description",
        widget: "textarea",
        widgetProps: {
          autoSize: {maxRows: 20, minRows: 3},
          showCount: true,
          maxLength: 300,
        },
      },
      {
        key: 'content',
        label: 'Content',
        message: 'Vui lòng nhập content',
        widget: Editor,
      },
      {
        key: 'source',
        label: 'Source',
        required: true,
        message: 'Vui lòng nhập source',
      },
      {
        key: 'index',
        label: 'Index',
        required: true,
        message: 'Vui lòng nhập index',
        widget: 'number',
        widgetProps: {
          style: {
            minWidth: '12rem',
          },
        },
      },
      {
        key: 'category',
        label: 'Category',
        options:
          categories?.length > 0
            ? categories.map((item) => [item.id, item.name])
            : [],
        widget: 'select',
        required: true,
        widgetProps: {
          style: {
            minWidth: '12rem',
          },
          placeholder: 'Chọn category',
        },
      },
      {
        key: 'state',
        label: 'State',
        options: MAP_STATE_STATUS,
        widget: 'select',
        required: true,
        message: 'State không được để trống',
        widgetProps: {
          style: {
            minWidth: '12rem',
          },
          placeholder: 'Chọn State',
          allowClear: true,
        },
      },
    ],
  };
};
