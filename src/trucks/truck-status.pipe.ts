import {
  ArgumentMetadata,
  HttpException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import status from 'utils/enums/truck-status.enum';
@Injectable()
export class TruckStatusPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!Object.values(status).includes(value)) {
      throw new HttpException(
        "status must be from following values: 'Loading', 'Outbound', 'Returning', 'Maintenance'",
        400,
      );
    }
    return value;
  }
}
