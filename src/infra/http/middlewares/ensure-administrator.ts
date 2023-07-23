import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from 'src/app/repositories/users-repository';

@Injectable()
export class EnsureAdministratorGuard {
  constructor(private usersRepository: UsersRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as {
      user: { sub: string };
    };

    const user = await this.usersRepository.findByEmail(request.user.sub);

    if (!user.isAdmin) throw new UnauthorizedException('User must be admin!');

    return true;
  }
}
