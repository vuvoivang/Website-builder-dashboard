import React from 'react';

export const metaFormLogin = {
  formItemLayout: [4, 16],
  initialValues: {
    productType: -1,
  },
  fields: [
    {
      label: 'Username',
      key: 'username',
      required: true,
      message: 'Vui lòng nhập username ',
    },
    {
      label: 'Password',
      key: 'password',
      widget: 'password',
      required: true,
      message: 'Vui lòng nhập password',
    },
  ],
};
