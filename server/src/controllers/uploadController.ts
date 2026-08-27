import type { Request, Response, NextFunction } from 'express';
import cloudinary from '../config/cloudinary';

export const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file provided' });

    const folder = (req.body?.folder as string) || 'maoki-house';

    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder, resource_type: 'image' },
        (error, uploadResult) => {
          if (error || !uploadResult) return reject(error || new Error('Upload failed'));
          resolve(uploadResult as { secure_url: string });
        }
      );
      stream.end(file.buffer);
    });

    res.status(201).json({ url: result.secure_url });
  } catch (error) {
    next(error);
  }
};
