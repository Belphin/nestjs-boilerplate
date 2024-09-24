import * as admin from 'firebase-admin';

export function initializeFirebaseApp(serviceAccountKey = null): admin.app.App {
  if (!serviceAccountKey) {
    serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  }

  if (!serviceAccountKey) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is not defined');
  }

  if (!admin.apps.length) {
    return admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(serviceAccountKey)),
    });
  } else {
    return admin.app();
  }
}
