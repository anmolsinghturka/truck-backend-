import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Truck } from 'src/trucks/entities/truck.entity';
import Util from 'utils/util';
import status from 'utils/enums/truck-status.enum';
import { Repository } from 'typeorm';
import { CreateTruckDto } from './dto/filter.dto';

@Injectable()
export class BcmService {
  constructor(
    @InjectRepository(Truck) private truckRepository: Repository<Truck>,
  ) {}
  logger: Logger = new Logger(BcmService.name);

  async getAllStatus(res: Response) {
    this.logger.log('getting truck statuses');
    try {
      const trucks = await this.truckRepository.find();
      const statuses = trucks.map((t) => ({ id: t.id, status: t.status }));
      return Util.getOkRequest(
        statuses,
        'status of trucks fetched successfully',
        res,
      );
    } catch (error) {
      this.logger.log(error.message);
      return Util.getBadRequest(error.message, res);
    }
  }

  async filterTrucks(
    res: Response,
    id?: string,
    driver_name?: string,
    registration_number?: string,
    destination?: string,
    status?: string,
  ) {
    try {
      let filter = {};
      if (id) Object.assign(filter, { id });
      if (driver_name) Object.assign(filter, { driver_name });
      if (registration_number) Object.assign(filter, { registration_number });
      if (destination) Object.assign(filter, { destination });
      if (status) Object.assign(filter, { status });
      const foundTrucks = await this.truckRepository.findBy({ ...filter });
      return Util.getOkRequest(foundTrucks, 'data fetched successfully', res);
    } catch (error) {
      return Util.getBadRequest(error.message, res);
    }
  }

  async updateTruckStatus(id: number, status: status, res: Response) {
    this.logger.log('updating truck status');
    try {
      await this.truckRepository.update(id, {
        status: status,
      });
      return Util.getSimpleOkRequest('Truck status updated', res);
    } catch (error) {
      this.logger.log(error.message);
      return Util.getBadRequest(error.message, res);
    }
  }

  async createTruck(createTruck: CreateTruckDto, res: Response) {
    this.logger.log('Creating truck');
    try {
      await this.truckRepository.insert({
        ...createTruck,
      });

      return Util.getOkRequest(createTruck, 'truck created successfully', res);
    } catch (error) {
      this.logger.log(error.message);
      return Util.getBadRequest(error.message, res);
    }
  }
}
