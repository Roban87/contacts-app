import multer from 'multer';
import type { NextApiRequest, NextApiResponse } from 'next';
import { s3Download, s3Upload } from '../../../../libs/s3';
import fs from 'fs';
import util from 'util';

const image = multer({ dest: 'uploads/' });
const unlinkFile = util.promisify(fs.unlink);

export default function handler(request: NextApiRequest, res: NextApiResponse) {
    const req = request as any;
    if (req.method === 'GET') {
        return downloadImage(req, res);
    }

    if (req.method === 'POST') {
        return uploadImage(req, res);
    }
}

async function uploadImage(request: NextApiRequest, res: NextApiResponse) {
    const req = request as any;
    try {
        const file = req.file
        image.single(file);

        const result = await s3Upload(file);

        await unlinkFile(file.path);

        return (res as any).status(200).json({ key: result.key });
    } catch (e) {
        return (res as any).status(500).json({ message: e.message });
    }
}

async function downloadImage(request: NextApiRequest, res: NextApiResponse) {
    const req = request as any;
    try {
        const key = req.query.image;
        const result = s3Download(key);
        return req.status(200).json(result);
    } catch (e: any) {
        return (res as any).status(500).json({ message: e.message });
    }
}
