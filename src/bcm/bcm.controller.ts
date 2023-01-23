import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import status from 'utils/enums/truck-status.enum';
import { BcmService } from './bcm.service';
import { CreateTruckDto } from './dto/filter.dto';

@ApiTags('BCM')
@Controller('bcm')
export class BcmController {
  constructor(private readonly bcmService: BcmService) {}

  @Get('/truck-status')
  getAllStatuses(@Res() res: Response) {
    return this.bcmService.getAllStatus(res);
  }

  @ApiQuery({ name: 'id', type: String, required: false })
  @ApiQuery({ name: 'driver_name', type: String, required: false })
  @ApiQuery({ name: 'registration_number', type: String, required: false })
  @ApiQuery({ name: 'destination', type: String, required: false })
  @ApiQuery({ name: 'status', enum: status, required: false })
  @Get('/by/filter')
  filterTrucks(
    @Res() res: Response,
    @Query('id') id: string,
    @Query('driver_name') driver_name: string,
    @Query('registration_number') registration_number: string,
    @Query('destination') destination: string,
    @Query('status') status: status,
  ) {
    return this.bcmService.filterTrucks(
      res,
      id,
      driver_name,
      registration_number,
      destination,
      status,
    );
  }

  @ApiQuery({ name: 'status', enum: status })
  @Put('/update-truck-status/:id')
  updateTruckStatus(
    @Param('id', new ParseIntPipe()) id: number,
    @Res() res: Response,
    @Query('status') status: status,
  ): void {
    this.bcmService.updateTruckStatus(id, status, res);
  }

  @Post('/create-truck')
  createTruck(@Body() createTruck: CreateTruckDto, @Res() res: Response) {
    this.bcmService.createTruck(createTruck, res);
  }
}
