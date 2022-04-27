import { IsString, IsInt, IsEnum, IsNotEmpty } from 'class-validator'
import { OperationType } from 'src/type/operation.type';

export class CreateOperationDto {
    @IsInt()
    value: number;

    @IsString()
    @IsNotEmpty()
    @IsEnum(OperationType)
    type: OperationType;
}