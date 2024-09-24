import { Injectable } from '@nestjs/common';
import { initializeFirebaseApp } from 'configs/firebase.config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private readonly app = initializeFirebaseApp();

  get auth() {
    return this.app.auth();
  }

  async verifyIdToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
    return this.auth.verifyIdToken(idToken);
  }

  async disableUser(firebaseId: string): Promise<void> {
    await this.auth.updateUser(firebaseId, { disabled: true });
    await this.auth.revokeRefreshTokens(firebaseId);
  }
}
