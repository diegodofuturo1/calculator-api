import { ApiTags } from "@nestjs/swagger";
import { Body, Controller, Post } from "@nestjs/common";
import { CalculatorService } from "./calculator.service";
import { CreateCalculatorDto } from "src/dto/create-calculator.dto";

@ApiTags('calculator')
@Controller('calculator')
export class CalculatorController {
    constructor(
        private readonly service: CalculatorService
    ) {}

    @Post()
    async calculator(@Body() { stageId, actionId }: CreateCalculatorDto) {
        return await this.service.calculator(stageId, actionId)
    }
}