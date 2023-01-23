import { Module } from '@nestjs/common';
import { BcmService } from './bcm.service';
import { BcmController } from './bcm.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Truck } from 'src/trucks/entities/truck.entity';

@Module({
  controllers: [BcmController],
  providers: [BcmService],
  imports: [TypeOrmModule.forFeature([Truck])],
})
export class BcmModule {}
