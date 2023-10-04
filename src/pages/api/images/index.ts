/*
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { createRequestPresigner } from '@aws-sdk/s3-request-presigner';
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

const s3 = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    },
});

const upload = multer({ dest: 'uploads/' });

const router = createRouter<NextApiRequest, NextApiResponse>();

router
    .use(upload.single('file'))
    .post(async (req, res) => {
        console.log((req as any).file);
        const file = (req as any).file;
        console.log(file);
        const key = Date.now().toString();

        const putParams = {
            Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read',
        };

        try {
            await s3.send(new PutObjectCommand(putParams));

            const signedUrl = await createRequestPresigner(s3);
            const url = signedUrl(putParams, { expiresIn: 60 * 60 * 1000 }); // 1 hour

            return (res as any).status(200).json({ url });
        } catch (error) {
            console.error(error);
            return (res as any).status(500).json({ error: 'Error uploading file to S3' });
        }
    });

export default router.handler({
    onError: (err, req, res) => {
        console.error(err.stack);
        (res as any).status(err.statusCode || 500).end(err.message);
    },
});
*/
