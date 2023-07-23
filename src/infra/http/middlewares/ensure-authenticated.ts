import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from '../constants';

@Injectable()
export class EnsureAuthenticatedGuard {
  constructor(private jwtService: JwtService) {}

  private extractTokenFormHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFormHeader(request);

    if (!token) throw new UnauthorizedException('invalid token');

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      request.user = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
