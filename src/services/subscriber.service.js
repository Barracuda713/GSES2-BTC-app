import { HttpCode } from '../common/enums/enums.js';
import { subscriberModel } from '../data/models/models.js';
import { subscriberRepository } from '../data/repositories/repositories.js';

class SubscriberService {
  getAllSubscribers() {
    return subscriberRepository.getAll();
  }

  getSubscriberById(id) {
    const s = subscriberRepository.getOne({id});
    if (!s) throw {
      status: HttpCode.NOT_FOUND,
      message: 'Subscriber not found.'
    }
    return s;
  }

  addSubscriber(subscriber) {
    const es = subscriberRepository.getOne(s => (s.email === subscriber.email.toLowerCase()));
    if (es) throw {
      status: HttpCode.CONFLICT,
      message: 'Subscriber exists.'
    }

    const keys = Object.keys(subscriberModel);
    const s = {};
    keys
      .filter(k => (k !== 'id'))
      .forEach(k => s[k] = subscriber[k]);

    return subscriberRepository.create(s);
  }

  updateSubscriber(id, subscriber) {
    const keys = Object.keys(subscriber);
    const s = {};
    keys
      .filter(k => ((k !== 'id') && (k in subscriberModel)))
      .forEach(k => s[k] = subscriber[k]);
    
    if (Object.keys(s).length === 0) throw {
      status: HttpCode.BAD_REQUEST,
      message: `Update object is empty.`
    }

    if ('email' in s) {
      const es = subscriberRepository.getOne(s => (s.email === subscriber.email.toLowerCase()));
      if (es && (es.id !== id)) throw {
        status: HttpCode.BAD_REQUEST,
        message: `Subscriber with such data exists.`
      }
    }

    return subscriberRepository.update(id, s);
  }

  deleteSubscriber(id) {
    return subscriberRepository.delete(id);
  }
}

export const subscriberService = new SubscriberService();
