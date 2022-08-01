/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import { ExceptionMessage, HttpCode } from '../../common/enums/enums.js';

const subscriberErrors = {
  email: {
    status: HttpCode.BAD_REQUEST,
    message: ExceptionMessage.INVALID_EMAIL
  }
};

const subscriberFieldsValidator = {
  email: email => {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return reg.test(email);
  }
};

const subscriberValidator = data => {
  const keys = Object.keys(data)
    .filter(k => (k in subscriberFieldsValidator));
  
  for (const f of keys) {
    if (!subscriberFieldsValidator[f](data[f])) throw subscriberErrors[f];
  }

  return;
};

export { subscriberValidator };
