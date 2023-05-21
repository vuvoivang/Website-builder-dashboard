import { message } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

export const buildParams = (data?: any) => {
  if (data) {
    const dataEdited = {
      ...data,
    };

    let queryData = {};
    try {
      queryData = Object.fromEntries(
        Object.entries(dataEdited).filter(([_, v]) => v != null && v !== '')
      );
    } catch (err) {
      console.error('Có lỗi xảy ra: ', err);
    }

    return Object.keys(queryData)
      .map((key) =>
        Array.isArray(queryData[key])
          ? `${key}=[${queryData[key]}]`
          : `${key}=${encodeURIComponent(queryData[key])}`
      )
      .join('&');
  }
  return '';
};
export const buildURLWithParam = (url: string, query?: any) => {
  return `${url}?${buildParams(query)}`;
};

export const fromEntries = (iterable) => {
  return [...iterable].reduce((obj, [key, val]) => {
    obj[key] = val;
    return obj;
  }, {});
};

export const insertAt = (arr: any[], item: any, index = 0) => {
  return [...arr.slice(0, index), item, ...arr.slice(index)];
};

// TO DO: rewrite this
export function asyncAction(title = '', actionFn) {
  return Promise.resolve()
    .then(() => actionFn())
    .then((data) => {
      if (data && data.code !== 0) {
        message.error(
          `${title} thất bại! [${
            data.code ? `code: ${data.code} | ` : ''
          }message: ${data.msg}]`
        );
        return undefined;
      }
      if (title) {
        message.success(`${title} thành công!`);
      }
      return data;
    })
    .catch((data) => {
      if (title && data && data.code) {
        message.error(
          `${title} thất bại! [${
            data.code ? `code: ${data.code} | ` : ''
          }message: ${data.msg}]`
        );
      } else {
        message.error(
          `${title} thất bại!${data?.msg ? ` | ${data?.msg}` : ''}`
        );
      }
      return Promise.reject(data);
    });
}

export const renderDuration = (
  seconds: string | number,
  hasHour?: boolean,
  isMillisecond?: boolean
) => {
  if (seconds) {
    if (isMillisecond) {
      const date = new Date(Number(seconds)).toISOString();
      if (hasHour) return date.substr(11, 8);
      return date.substr(14, 5);
    }
    const date = new Date(Number(seconds) * 1000).toISOString();
    if (hasHour) return date.substr(11, 8);
    return date.substr(14, 5);
  }
  return 0;
};

export const renderDateTime = (dateTime: number) =>
  dayjs(dateTime).format('DD/MM/YYYY HH:mm A');

export const removeUndefined = (obj) => {
  return Object.keys(obj).reduce((acc, key) => {
    const _acc = acc;
    if (obj[key] !== undefined) _acc[key] = obj[key];
    return _acc;
  }, []);
};

export const removeUndefinedOrNull = (obj) => {
  return Object.keys(obj).reduce((acc, key) => {
    const _acc = acc;
    if (obj[key] !== undefined && obj[key] !== null) _acc[key] = obj[key];
    return _acc;
  }, []);
};

export const dateToUnix = (
  date: undefined | Dayjs | Date | number,
  isConvertToMs = true
) => {
  if (date === 0) {
    return 0;
  }
  if (!date) return undefined;

  if (dayjs.isDayjs(date)) return isConvertToMs ? date.valueOf() : date.unix();

  return isConvertToMs ? dayjs(date).valueOf() : dayjs(date).unix();
};

export const removeAccents = (str) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};

export const compareString = (a, b) => {
  return removeAccents(a) > removeAccents(b) ? 1 : -1;
};

export const selectSearchFn = (input, options) => {
  return options.filter((i) => {
    return removeAccents(i[1].toLowerCase()).includes(
      removeAccents(input.toLowerCase())
    );
  });
};

export const selectSearchOptionFn = (input, option) =>
  removeAccents(option.label.toLowerCase()).indexOf(
    removeAccents(input.toLowerCase())
  ) >= 0;

export function extend(obj1, obj2) {
  return { ...obj1, ...obj2 };
}

// function to format number to locale
export const formatNumber = (number, locale?: 'vi-VN') => {
  return number.toLocaleString(locale);
};

// function to format date to locale
export const formatDate = (date, locale?: 'vi-VN') => {
  return date && dayjs(Number(date)).format('DD/MM/YYYY HH:mm:ss');
};

export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

export function getCookie(name) {
  function escape(s) {
    return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1');
  }

  const match = document.cookie.match(
    RegExp(`(?:^|;\\s*)${escape(name)}=([^;]*)`)
  );
  return match ? match[1] : null;
}

// use reverse map to create the type from enum's values
export type ReverseMap<T> = T[keyof T];


export const mappingDocumentsToCollections = (collections,documents ) => {
  const mappingDocumentsByCollectionsIds = documents?.reduce((acc, document) => {
    const { collectionId } = document;
    if (!acc[collectionId]) {
      acc[collectionId] = [];
    }
    acc[collectionId].push(document);
    return acc;
  }, {});
  return collections?.map((collection) => {
    const { id } = collection;
    return {
      ...collection,
      documents: mappingDocumentsByCollectionsIds?.[id],
    };
  });
}

export const getNormalizeStringForSearch = (str)=> {
  return str.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}


export const successMsg = (msg) => {
  message.success(msg);
}

export const errorMsg = (msg) => {
  message.error(msg);
}
