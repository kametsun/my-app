import { error } from './notifications';

//バリデーション
export const isEmptyObject = obj => Object.keys(obj).length === 0;

const isValiDate = dateObj => !Number.isNaN(Date.parse(dateObj));

export const validateEvent = (event) => {
  const errors = {};

  if (event.event_type === '') {
    errors.event_type = 'イベントタイプを入力してください。';
  }

  if (event.event_date === '') {
    errors.event_date = 'イベントの日程を入力してください。';
  }

  if (event.title === '') {
    errors.title = 'タイトルを入力してください。';
  }

  if (event.speaker === '') {
    errors.speaker = '少なくとも1人のスピーカーをエントリーする必要があります。';
  }

  if (event.host === '') {
    errors.host = '少なくとも1つのホストを入力する必要があります。';
  }

  if (!isValiDate(event.event_date)) {
    errors.event_date = "日付を入力してください。";
  }

  return errors;
}

//日付フォーマット
export const formatDate = (d) => {
    const YYYY = d.getFullYear();
    const MM = `0${d.getMonth() + 1}`.slice(-2);
    const DD = `0${d.getDate()}`.slice(-2);
  
    return `${YYYY}-${MM}-${DD}`;
  };

export const handleAjaxError = (err) => {
  error("エラーが発生しました。");
  console.error(err);
}