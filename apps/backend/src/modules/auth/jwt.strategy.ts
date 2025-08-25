import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy, ExtractJwt, StrategyOptions} from "passport-jwt";
import { JwtPayload } from "@/modules/auth/jwt.payload";
import { AuthService } from "@/modules/auth/auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET!,
    };
    super(options);
  }

  validate(payload: JwtPayload) {
    return { id: payload.id, email: payload.email };
  }
}
