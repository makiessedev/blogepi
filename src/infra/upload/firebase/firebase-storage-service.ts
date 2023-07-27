import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { initializeApp } from 'firebase/app';
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';
import { firebaseConfig } from './firebase.config';

@Injectable()
export class FirebaseStorageService {
  async uploadFile(file: Express.Multer.File): Promise<string> {
    initializeApp(firebaseConfig);

    const storage = getStorage();

    const storageRef = ref(
      storage,
      `images_posts/${randomUUID()}-${file.originalname}`,
    );

    const snapshot = await uploadBytesResumable(storageRef, file.buffer, {
      contentType: file.mimetype,
    });

    const downloadUrl = await getDownloadURL(snapshot.ref);

    return downloadUrl;
  }
}
