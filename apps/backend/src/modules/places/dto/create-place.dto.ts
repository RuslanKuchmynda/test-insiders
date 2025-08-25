import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class CreatePlaceDto {
  @IsString()
  tripId: string;

  @IsString()
  locationName: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsInt()
  @Min(1)
  dayNumber: number;
}