import { Router } from 'express';
import { PUBLIC_API_CRYPTO } from '../../common/constants/api.constants.js';
import { rateService } from '../../services/rate.service.js';
import { responseMiddleware } from '../../middlewares/middlewares.js';
import { queryParserHelper } from '../../helpers/helpers.js';

const router = Router();

const { defaultParams } = PUBLIC_API_CRYPTO;

router.route('/')
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

router.use(responseMiddleware);

export { router as rateRouter };
