import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
const bucketRegion = process.env.NEXT_PUBLIC_AWS_BUCKET_REGION;
const awsAccessKey = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY;
const awsSecretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;

/*const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/')
    },
    filename: (req, file, callback) => {
        callback(null, file.filename)
    }
})

const upload = multer({ storage });*/

const s3Client = new S3Client({
    region: bucketRegion,
    credentials: {
        accessKeyId: awsAccessKey,
        secretAccessKey: awsSecretAccessKey
    }
});

export async function s3Upload(file, fileName) {
    // const fileStream = fs.createReadStream(file.path);
    console.log('file', file);
    try {
        const uploadParams = new PutObjectCommand({
            Bucket: bucketName,
            Body: file,
            Key: fileName,
        });

        return s3Client.send(uploadParams);
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export async function s3Download(fileKey) {
    const downloadParams = new GetObjectCommand({
        Bucket: bucketName,
        Key: fileKey,
    });

    return s3Client.send(downloadParams).createReadStream();
}
