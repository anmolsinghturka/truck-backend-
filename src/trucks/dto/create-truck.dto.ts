import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import status from 'utils/enums/truck-status.enum';

export class CreateTruckDto {
  id: number;

  @ApiProperty({ enum: status, required: false })
  @IsEnum(status)
  @IsOptional()
  status: status;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  driver_name: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @MinLength(11)
  @MaxLength(15)
  @IsNotEmpty()
  driver_contact_no: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @MinLength(10)
  @MaxLength(20)
  @IsNotEmpty()
  driver_license: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @MinLength(4)
  @MaxLength(10)
  @IsNotEmpty()
  model: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @MinLength(5)
  @MaxLength(8)
  @IsNotEmpty()
  plate_number: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @MinLength(5)
  @MaxLength(8)
  @IsOptional()
  destination: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @MinLength(5)
  @MaxLength(8)
  @IsOptional()
  start_place: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @MinLength(5)
  @MaxLength(8)
  @IsNotEmpty()
  registration_number: string;
}
