import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from 'src/app/repositories/users-repository';

@Injectable()
export class EnsureAdministratorGuard implements CanActivate {
  constructor(private usersRepository: UsersRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as {
      user: { email: string };
    };

    const user = await this.usersRepository.findByEmail(request.user.email);

    if (!user.isAdmin) throw new UnauthorizedException('User must be admin!');

    return true;
  }
}
