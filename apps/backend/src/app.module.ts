import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {AuthModule} from "@/modules/auth/auth.module";
import {PassportModule} from "@nestjs/passport";
import {TripsModule} from "@/modules/trips/trips.module";

@Module({
  imports: [AuthModule, PassportModule, TripsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
