import { EventDTO } from "./EventDTO";
import PromiseB from "bluebird";

export declare type EventListenersDTO = {
  eventId: string;
  listener: (args: EventDTO) => PromiseB<void>;
};
