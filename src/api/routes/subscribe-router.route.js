import { Router } from 'express';
import { subscriberService } from '../../services/subscriber.service.js';
import { 
  responseMiddleware, 
  createSubscriberValidMiddleware, 
  updateSubscriberValidMiddleware
} from '../../middlewares/middlewares.js';

const router = Router();

router.route('/')
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

router.route('/:id')
  .put(updateSubscriberValidMiddleware, (req, res, next) => {
    try {
      const subscriber = subscriberService.updateSubscriber(req.params.id, req.body);
      res.data = subscriber;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  })
  .delete((req, res, next) => {
    try {
      const subscriber = subscriberService.deleteSubscriber(req.params.id);
      res.data = subscriber;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  });

router.use(responseMiddleware);

export { router as subscribeRouter };
