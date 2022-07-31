import { Router } from 'express';
import { ApiPath } from '../../common/enums/enums.js';
import { PUBLIC_API_CRYPTO } from '../../common/constants/api.constants.js';
import { rateService } from '../../services/rate.service.js';
import { subscriberService } from '../../services/subscriber.service.js';
import { responseMiddleware, createSubscriberValidMiddleware } from '../../middlewares/middlewares.js';
import { queryParserHelper } from '../../helpers/helpers.js';

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

router.use(responseMiddleware);

export default router;
