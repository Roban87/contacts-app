import IncomingForm from 'formidable/Formidable';
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { Part } from 'formidable';
import path from 'path';

export const config: any = {
    api: {
        bodyParser: false
    }
}

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    const req = request as any;
    const res = response as any;

   const options: formidable.Options = {};
    options.uploadDir = path.join(process.cwd(), '/public/images');
    options.filename = (name: string, ext: string, part: Part, form: IncomingForm) => {
        return `${Date.now().toString()}-${ part.originalFilename }`;
    };

    const form = formidable(options);

    try {
        const [fields, files] = await form.parse(req);

        res.status(200).json((files as any).file[0]);
    } catch (e: any) {
        return res.status(500).json({ message: e.message });
    }
}
