import { IsPositive, IsInt } from 'class-validator'

export class CreateStageDto {
    @IsInt()
    start: number;
  
    @IsInt()
    @IsPositive()
    level: number;
  
    @IsInt()
    end: number;
  
    @IsInt()
    @IsPositive()
    times: number;
}