import { Router } from 'express';
import { ApiPath, ExceptionMessage, HttpCode } from '../../common/enums/enums.js';
import { PUBLIC_API_CRYPTO } from '../../common/constants/api.constants.js';
import { rateService } from '../../services/rate.service.js';
import { subscriberService } from '../../services/subscriber.service.js';
import { mailService } from '../../services/mail.service.js';
import { responseMiddleware, createSubscriberValidMiddleware } from '../../middlewares/middlewares.js';
import { queryParserHelper, getDateFormat } from '../../helpers/helpers.js';

const router = Router();

const { defaultParams } = PUBLIC_API_CRYPTO;

router.route(ApiPath.RATE)
  .get((req, res, next) => {
    const params = queryParserHelper(defaultParams, req.query);
    
    rateService.getPrice(params)
    .then(price => {
      res.data = price.data.data[0]?.quote[params.convert];
    })
    .catch(err => {
      res.err = err
    })
    .finally(next)
  });

router.route(ApiPath.SUBSCRIBE)
  .post(createSubscriberValidMiddleware, (req, res, next) => {
    try {
      const subscriber = subscriberService.addSubscriber(req.body);
      res.data = subscriber;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  });

router.route(ApiPath.SEND_EMAILS)
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
        console.log(r);
        res.data = r;
      })
      .catch(err => {
        res.err = err;
      })
      .finally(next);
  });

router.use(responseMiddleware);

export default router;
