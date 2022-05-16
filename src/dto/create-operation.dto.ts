import { IsString, IsInt, IsEnum, IsNotEmpty } from 'class-validator'
import { OperationEnum, OperationType } from 'src/type/operation.type';

export class CreateOperationDto {
    @IsInt()
    value: number;

    @IsString()
    @IsNotEmpty()
    @IsEnum(OperationEnum)
    type: OperationType;

    @IsString()
    stageId: string
}