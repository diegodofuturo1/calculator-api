import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import Entity from './entity';
import { OperationController } from './module/operation/operation.controller';
import { OperationModule } from './module/operation/operation.module';

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
  imports: [OperationModule, TypeOrmModule.forRoot(typeormConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
