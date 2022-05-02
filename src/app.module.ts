import Entity from './entity';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { OperationModule } from './endpoint/operation/operation.module';
import { ActionModule } from './endpoint/action/action.module';
import { StageModule } from './endpoint/stage/stage.module';
import { CalculatorModule } from './endpoint/calculator/calculator.module';

const typeormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'database-teste.cfivy9mndmbv.sa-east-1.rds.amazonaws.com',
  port: 3306,
  username: 'root',
  password: 'd1&G)H&L&N)',
  database: 'calculator',
  entities: [...Entity],
  synchronize: true,
};

@Module({
  imports: [ OperationModule, StageModule, ActionModule, CalculatorModule, TypeOrmModule.forRoot(typeormConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
