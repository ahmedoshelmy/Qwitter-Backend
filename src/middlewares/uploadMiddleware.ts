import multer from 'multer';
import { Request } from 'express';
import { AppError } from '../utils/appError';
import { UserRequest } from 'request-types';

export const multerStorage = multer.diskStorage({
  destination: function (
    _req: Request,
    _file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void,
  ) {
    callback(null, `public/imgs/user${_req.url}`);
  },
  filename: function (
    req: UserRequest,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void,
  ) {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${req.user.id}${Date.now()}.${ext}`);
  },
});
export const tweetMediaStorage = multer.diskStorage({
  destination: function (
    _req: Request,
    _file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void,
  ) {
    callback(null, `public/imgs/tweet`);
  },
  filename: function (
    req: UserRequest,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void,
  ) {
    const ext = file.mimetype.split('/')[1];
    cb(null, `tweet-${req.user.id}${Date.now()}.${ext}`);
  },
});

export const imageFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, valid: boolean) => void,
) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError(`Not an image file`, 400), false);
  }
};
const allowedMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'video/mp4',
  'video/mpeg',
]; // Add more mime types if needed
const mediaFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, valid: boolean) => void,
) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        `Invalid file type. Only JPEG, PNG, GIF, MP4, and MPEG files are allowed.'`,
        400,
      ),
      false,
    );
  }
};

export const upload = multer({
  storage: multerStorage,
  fileFilter: imageFilter,
});
export const uploadMedia = multer({
  storage: tweetMediaStorage,
  fileFilter: mediaFilter,
});

export const uploadImageMiddleware = upload.single('photo');
export const uploadTweetMediaMiddleware = uploadMedia.array('media', 5);