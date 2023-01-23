import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Truck } from './trucks/entities/truck.entity';
import { TrucksModule } from './trucks/trucks.module';
import { BcmModule } from './bcm/bcm.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'trucks',
      entities: [Truck],
      synchronize: true,
    }),
    TrucksModule,
    BcmModule,
  ],
})
export class AppModule {}
