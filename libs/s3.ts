import { GetObjectCommand, PutObjectCommand, S3 } from 'aws-sdk/clients/s3';
import fs from 'fs';

const bucketName = process.env.AWS_BUBKET_NAME;
const bucketRegion = process.env.AWS_BUBKET_REGION;
const awsAccessKey = process.env.AWS_ACCESS_KEY;
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3({
    bucketRegion,
    awsAccessKey,
    awsSecretAccessKey,
})

export async function s3Upload(file) {
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = new PutObjectCommand({
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename,
    })

    return s3.send(uploadParams);
}

export async function s3Download(fileKey) {
    const downloadParams = new GetObjectCommand({
        Bucket: bucketName,
        Key: fileKey,
    });

    return s3.send(downloadParams).createReadStream();
}
