import { Router } from 'express';
import { ExceptionMessage, HttpCode } from '../../common/enums/enums.js';
import { PUBLIC_API_CRYPTO } from '../../common/constants/api.constants.js';
import { rateService } from '../../services/rate.service.js';
import { subscriberService } from '../../services/subscriber.service.js';
import { mailService } from '../../services/mail.service.js';
import { responseMiddleware } from '../../middlewares/middlewares.js';
import { getDateFormat } from '../../helpers/helpers.js';

const router = Router();

const { defaultParams } = PUBLIC_API_CRYPTO;

router.route('/')
  .post((req, res, next) => {
    const subscribers = subscriberService.getAllSubscribers().map(s => s.email);

    if (subscribers.length === 0) throw {
      status: HttpCode.NOT_FOUND,
      message: ExceptionMessage.SUBSCRIBERS_NOT_FOUND
    }

    rateService.getPrice(defaultParams)
      .then(price => {
        const rate = price.data.data[0]?.quote[defaultParams.convert];

        return mailService.sendMails(subscribers, {
          date: getDateFormat(rate.last_updated, 'Mon DD, YYYY'),
          rate: Math.round(rate.price * 100) / 100
        })
      })
      .then(r => {
        res.data = r;
      })
      .catch(err => {
        res.err = err;
      })
      .finally(next);
  });

router.use(responseMiddleware);

export { router as mailRouter };
