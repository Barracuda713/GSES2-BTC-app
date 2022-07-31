import { HttpCode } from '../common/enums/enums.js';

const checkFieldsAndTypes = (model, data, ignore = []) => {
  const requiredFieldsArray = Object.keys(model)
    .filter(f => !(ignore.includes(f)));
  
  for (const f of requiredFieldsArray) {
    if (typeof(data[f]) === "undefined") throw {
      status: HttpCode.BAD_REQUEST,
      message: `Missed field '${f}'!`
    };

    if (typeof(data[f]) !== typeof(model[f])) throw {
      status: HttpCode.BAD_REQUEST,
      message: `Wrong type of field '${f}'!`
    };
  }

  return null;
};

export { checkFieldsAndTypes };
