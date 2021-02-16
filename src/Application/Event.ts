import { EventManager } from "../Domain/Event/EventManager";
import { EventListenersDTO } from "../Domain/DTO/EventListenersDTO";

module.exports = {
  register: (listeners: EventListenersDTO[]) => {
    listeners.forEach((listener) => {
      EventManager.getInstance().register({
        eventListener: listener,
      });
    });
  },
};
