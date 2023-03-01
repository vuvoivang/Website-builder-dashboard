import React from 'react';

import { MAP_STATE_STATUS } from '~/src/constant';
import { IMetaFormBuilder } from '~/src/ui/shared/forms/FormBuilder/FormBuilder';

export const metaFormAddCategory = {
  formItemLayout: [2, 20],
  fields: [
    {
      key: 'name',
      label: 'Name',
      required: true,
      message: 'Vui lòng nhập name',
    },
    {
      key: 'key',
      label: 'Key',
      required: true,
      message: 'Vui lòng nhập key',
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
} as IMetaFormBuilder;
