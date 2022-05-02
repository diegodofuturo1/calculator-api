import { IsUUID } from  'class-validator'

export class CreateCalculatorDto {
    @IsUUID()
    stageId: string

    @IsUUID()
    actionId: string
}