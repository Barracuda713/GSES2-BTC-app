/* eslint-disable max-len */
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const getDateFormat = (date, format) => {
  const d = new Date(date);
  const dateFormats = {
    'YYYY-MM-DD': () => `${d.getFullYear()}-${(d.getMonth() + 1 < 10) ? '0' : ''}${d.getMonth() + 1}-${(d.getDate() < 10) ? '0' : ''}${d.getDate()}`,
    'DD.MM.YYYY': () => `${(d.getDate() < 10) ? '0' : ''}${d.getDate()}.${(d.getMonth() + 1 < 10) ? '0' : ''}${d.getMonth() + 1}.${d.getFullYear()}`,
    'Mon DD, YYYY': () => `${monthNames[d.getMonth()]} ${(d.getDate() < 10) ? '0' : ''}${d.getDate()}, ${d.getFullYear()}`
  };
  return dateFormats[format]();
};

export { getDateFormat };
