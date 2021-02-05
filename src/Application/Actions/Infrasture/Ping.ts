import { ActionBase } from "../ActionBase";
import PromiseB from "bluebird";

export class Ping extends ActionBase {
  protected doCall(): PromiseB<{ status: "ok" }> {
    return PromiseB.try(() => {
      return { status: "ok" };
    });
  }
}
