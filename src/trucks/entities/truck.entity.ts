import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import status from 'utils/enums/truck-status.enum';
@Entity()
export class Truck {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({
    type: 'enum',
    enum: status,
    default: status.Loading,
  })
  status: status;

  @Column({ type: 'text' })
  driver_name: string;

  @Column({ type: 'text' })
  driver_contact_no: string;

  @Column({ type: 'text' })
  driver_license: string;

  @Column({ type: 'text' })
  model: string;

  @Column({ type: 'text' })
  plate_number: string;

  @Column({ type: 'text' })
  registration_number: string;

  @Column({ type: 'text', nullable: true })
  start_place: string;

  @Column({ type: 'text', nullable: true })
  destination: string;
}
