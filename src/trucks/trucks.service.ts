import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import status from 'utils/enums/truck-status.enum';
import Util from 'utils/util';
import { Repository } from 'typeorm';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { Truck } from './entities/truck.entity';

@Injectable()
export class TrucksService {
  constructor(
    @InjectRepository(Truck) private truckRepository: Repository<Truck>,
  ) {}
  logger: Logger = new Logger(TrucksService.name);

  async getSingleTruck(id: number, res: Response) {
    this.logger.log('getting by id');
    try {
      const truck = await this.truckRepository.findOneBy({ id });
      if (truck != null)
        return Util.getOkRequest(truck, 'truck fetched successfully', res);
      else return Util.getSimpleOkRequest('no record found', res);
    } catch (error) {
      this.logger.log(error.message);
      return Util.getBadRequest(error.message, res);
    }
  }
  async getAllTrucks(res: Response) {
    this.logger.log('getting all trucks');
    try {
      const trucks = await this.truckRepository.find();
      if (trucks.length > 0)
        return Util.getOkRequest(trucks, 'data fetched successfully', res);
      else return Util.getSimpleOkRequest('no record found', res);
    } catch (error) {
      this.logger.log(error.message);
      return Util.getBadRequest(error.message, res);
    }
  }

  async getByStatus(status: status, res: Response) {
    this.logger.log('getting all trucks by status');
    try {
      const trucks = await this.truckRepository.findBy({ status });
      if (trucks.length > 0)
        return Util.getOkRequest(trucks, 'data fetched successfully', res);
      else return Util.getSimpleOkRequest('no record found', res);
    } catch (error) {
      this.logger.log(error.message);
      return Util.getBadRequest(error.message, res);
    }
  }

  async updateTruck(id: number, updateTruck: UpdateTruckDto, res: Response) {
    this.logger.log('updating truck');
    try {
      if (Object.keys(updateTruck).length == 0)
        throw new Error('Please provide valid properties to update');
      const result = await this.truckRepository.update(id, {
        ...updateTruck,
      });
      if (result.affected > 0)
        return Util.getSimpleOkRequest('truck updated successfully', res);
      else return Util.getSimpleOkRequest('no record found', res);
    } catch (error) {
      this.logger.log(error.message);
      return Util.getBadRequest(error.message, res);
    }
  }

  async deleteTruck(id: number, res: Response) {
    this.logger.log('deleting by id');
    try {
      await this.truckRepository.delete(id);
      return Util.getSimpleOkRequest('truck deleted successfully', res);
    } catch (error) {
      this.logger.log(error.message);
      return Util.getBadRequest(error.message, res);
    }
  }
}
