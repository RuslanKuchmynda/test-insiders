import { Module } from '@nestjs/common';

import { AuthModule } from '@/modules/auth/auth.module';
import { TripsService } from '@/modules/trips/trips.service';
import { TripsController } from '@/modules/trips/trips.controller';

@Module({
  imports: [AuthModule],
  providers: [TripsService],
  controllers: [TripsController],
  exports: [TripsService],
})
export class TripsModule {}
