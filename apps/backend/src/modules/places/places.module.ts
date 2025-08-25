import { Module } from "@nestjs/common";

import { AuthModule } from "@/modules/auth/auth.module";
import {PlacesController} from "@/modules/places/places.controller";
import {PlacesService} from "@/modules/places/places.service";

@Module({
  imports: [AuthModule],
  providers: [PlacesService],
  controllers: [PlacesController],
  exports: [PlacesService],
})
export class PlacesModule {}
