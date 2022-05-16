import { Action } from "../entity/action.entity";
import { Operation } from "../entity/operation.entity";

export interface ActionDto extends Action {
    operations: Operation[]
}