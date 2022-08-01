import { ExceptionMessage, HttpCode } from '../../common/enums/enums.js';
import { subscriberModel } from '../../data/models/models.js';
import { checkFieldsAndTypes, subscriberValidator } from '../../helpers/helpers.js';

const isSubscriberValid = (data, ignoreFields = []) => {
  // check availability and right types of fields 
  // (model, data, ignoreFields[])
  checkFieldsAndTypes(subscriberModel, data, ignoreFields);

  // check validity of some fields
  subscriberValidator(data);

  return;
};

const createSubscriberValidMiddleware = (req, res, next) => {
  const data = {...req.body};

  try {
    if ('id' in data) throw {
      status: HttpCode.UNPROCESSABLE_ENTITY,
      message: ExceptionMessage.REDUNDANT_FIELD_ID
    };

    isSubscriberValid(data, ['id']);
  } catch (err) {
    next(err);
  } finally {
    req.body.email = req.body.email.toLowerCase();
    next();
  }
};

const updateSubscriberValidMiddleware = (req, res, next) => {
  const data = {...req.body};
  const getIgnored = () => Object.keys(subscriberModel)
    .filter(k => !(k in data));
  
  try {
    isSubscriberValid(data, [...getIgnored()]);
  } catch (err) {
    next(err);
  } finally {
    if (data.email) {
      req.body.email = req.body.email.toLowerCase();
    }
    next();
  }
};

export { createSubscriberValidMiddleware, updateSubscriberValidMiddleware };
