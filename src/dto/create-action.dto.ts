import { IsUUID } from 'class-validator'

export class CreateActionDto {
    @IsUUID()
    stageId: string;
}