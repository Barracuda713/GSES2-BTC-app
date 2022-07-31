import { Abstract } from '../repositories.js';

class SubscriberRepository extends Abstract {
  constructor() {
    super('subscribers');
  }
}

export const subscriberRepository = new SubscriberRepository();
