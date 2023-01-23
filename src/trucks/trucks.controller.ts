import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import status from 'utils/enums/truck-status.enum';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { TruckStatusPipe } from './truck-status.pipe';
import { TrucksService } from './trucks.service';

@ApiTags('Trucks')
@Controller('trucks')
export class TrucksController {
  constructor(private readonly trucksService: TrucksService) {}

  @Get('/')
  getAllTrucks(@Res() res: Response) {
    return this.trucksService.getAllTrucks(res);
  }

  @Get(':id')
  getSingleTruck(
    @Param('id', new ParseIntPipe()) id: number,
    @Res() res: Response,
  ) {
    return this.trucksService.getSingleTruck(id, res);
  }

  @ApiQuery({ name: 'status', enum: status })
  @Get('/by/status')
  getByStatus(
    @Query('status', TruckStatusPipe) status: status,
    @Res() res: Response,
  ) {
    return this.trucksService.getByStatus(status, res);
  }

  @Put(':id')
  updateTruck(
    @Param('id', new ParseIntPipe()) id: number,
    @Res() res: Response,
    @Body() updateTruck: UpdateTruckDto,
  ) {
    this.trucksService.updateTruck(id, updateTruck, res);
  }

  @Delete(':id')
  deleteTruck(
    @Param('id', new ParseIntPipe()) id: number,
    @Res() res: Response,
  ) {
    this.trucksService.deleteTruck(id, res);
  }
}
