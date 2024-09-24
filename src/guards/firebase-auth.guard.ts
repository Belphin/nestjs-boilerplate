import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FirebaseService } from 'modules/firebase/firebase.service';

@Injectable()
export class FirebaseAuthGuard extends AuthGuard('firebase') {
  protected readonly firebaseService: FirebaseService;

  constructor(firebaseService: FirebaseService) {
    super();
    this.firebaseService = firebaseService;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Unauthorized access');
    }

    try {
      const token = authHeader.split(' ')[1];
      const decodedToken = await this.firebaseService.verifyIdToken(token);
      request.user = decodedToken;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Unauthorized access');
    }
  }
}
