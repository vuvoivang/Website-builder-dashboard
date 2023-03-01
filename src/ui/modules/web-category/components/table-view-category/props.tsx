import React from 'react';

import { ColumnType } from 'antd/lib/table';

import { StateStatus } from '~/src/constant';

export const columnTableCategory: ColumnType<any>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 70,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    width: 280,
    ellipsis: true,
  },
  {
    title: 'Key',
    dataIndex: 'key',
    width: 140,
    ellipsis: true,
  },
  {
    title: 'Index',
    dataIndex: 'index',
    width: 70,
  },
  {
    title: 'State',
    dataIndex: 'state',
    width: 100,
    render: (value) => {
      return <p>{value === StateStatus.ACTIVE ? 'Active' : 'Inactive'}</p>;
    },
  },
];
