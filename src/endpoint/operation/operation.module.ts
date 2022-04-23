import { Module } from "@nestjs/common";
import { Operation } from "src/entity/operation.entity";
import { OperationController } from "./operation.controller";
import { OperationService } from "./operation.service";
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Operation])],
  controllers: [OperationController],
  providers: [OperationService],
})
export class OperationModule {}
