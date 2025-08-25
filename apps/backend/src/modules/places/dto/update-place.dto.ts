import { IsOptional, IsString, IsInt, Min } from 'class-validator';

export class UpdatePlaceDto {
  @IsOptional()
  @IsString()
  locationName?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  dayNumber?: number;
}