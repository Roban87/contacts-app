// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import prisma from '../../../libs/prisma-client';
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if ((req as any).method === 'GET') {
        return list(req, res);
    }

    if ((req as any).method === 'POST') {

    }

    if ((req as any).method === 'DELETE') {

    }
    // res.status(200).json({ name: 'John Doe' });
}

async function list(req: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse> {
    const prisma = new PrismaClient();
    console.log(prisma as any);
    console.log('called');
    return (res as any).status(200).json({ result: prisma });
    try {
        const result = await prisma.contact.findMany();
        console.log(JSON.stringify(result, null, 4));
        return (res as any).status(200).json({ result });
    } catch (e: any) {
        console.log(e);
    } finally {
        await prisma.$disconnect();
    }

}
