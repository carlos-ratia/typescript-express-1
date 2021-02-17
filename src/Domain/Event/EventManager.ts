import { EventDTO } from "../DTO/EventDTO";
import { EventEmitter } from "events";
import { EventListenersDTO } from "../DTO/EventListenersDTO";
import PromiseB from "bluebird";

export interface IEventManager {
  emit(args: { eventDTO: EventDTO }): boolean;
  on(args: { eventListener: EventListenersDTO }): this;
}

export class EventManager implements IEventManager {
  private static _instance: EventManager;
  private readonly _emitter: EventEmitter;

  get emitter(): EventEmitter {
    return this._emitter;
  }

  private constructor() {
    this._emitter = new EventEmitter({
      captureRejections: true,
    });
  }

  public static getInstance(): EventManager {
    if (
      EventManager._instance === undefined ||
      EventManager._instance === null
    ) {
      EventManager._instance = new EventManager();
    }
    return EventManager._instance;
  }

  emit(args: { eventDTO: EventDTO }): boolean {
    return this.emitter.emit(args.eventDTO.eventId, args.eventDTO);
  }

  on(args: { eventListener: EventListenersDTO }): this {
    this.emitter.on(args.eventListener.eventId, async (_args: any) => {
      await PromiseB.resolve(
        args.eventListener.listener(_args as EventDTO)
      ).catch((error) => {
        console.error(error);
      });
    });
    return this;
  }
}
