import { ExceptionMessage, HttpCode } from '../common/enums/enums.js';
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
      message: ExceptionMessage.SUBSCRIBER_NOT_FOUND
    }
    return s;
  }

  addSubscriber(subscriber) {
    const es = subscriberRepository.getOne(s => (s.email === subscriber.email));
    if (es) throw {
      status: HttpCode.CONFLICT,
      message: ExceptionMessage.SUBSCRIBER_EXISTS
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
      message: ExceptionMessage.EMPTY_UPDATE_DATA
    }

    if ('email' in s) {
      const es = subscriberRepository.getOne(s => (s.email === subscriber.email));
      if (es && (es.id !== id)) throw {
        status: HttpCode.BAD_REQUEST,
        message: ExceptionMessage.SUBSCRIBER_WITH_DATA_EXISTS
      }
    }

    return subscriberRepository.update(id, s);
  }

  deleteSubscriber(id) {
    const s = subscriberRepository.delete(id);
    
    if (s.length === 0) throw {
      status: HttpCode.NOT_FOUND,
      message: ExceptionMessage.SUBSCRIBER_NOT_FOUND
    }

    return s;
  }
}

export const subscriberService = new SubscriberService();
