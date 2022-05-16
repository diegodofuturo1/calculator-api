import { ApiTags } from "@nestjs/swagger";
import { Controller, Get, Param } from "@nestjs/common";
import { CalculatorService } from "./calculator.service";

@ApiTags('calculator')
@Controller('calculator')
export class CalculatorController {
    constructor(
        private readonly service: CalculatorService
    ) {}

    @Get(':actionId')
    async calculator(@Param('actionId') actionId: string) {
        return await this.service.calculator(actionId)
    }
}