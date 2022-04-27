import { IsUUID, IsNumber } from 'class-validator'

export class CreateActionDto {
    @IsUUID()
    stageId: string;
  
    @IsNumber()
    result: number;
}