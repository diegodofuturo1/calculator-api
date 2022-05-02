import entity from "src/entity";
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CalculatorController } from "./calculator.controller";
import { CalculatorService } from "./calculator.service";
import { CalculatorCommandHandler } from "./command/calculator.command";
@Module({
    imports:[
        CqrsModule,
        TypeOrmModule.forFeature(entity)
    ],
    providers: [
        CalculatorService,
        CalculatorCommandHandler
    ],
    controllers: [
        CalculatorController
    ]
})
export class CalculatorModule {}