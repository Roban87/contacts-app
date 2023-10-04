import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(request: NextApiRequest, res: NextApiResponse) {
    const req = request as any;
    if (req.method === 'GET') {
        return listContacts(req, res);
    }

    if (req.method === 'POST') {
        return createContact(req, res);
    }
}

async function listContacts(request: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse> {
    const prisma = new PrismaClient();

    try {
        const result = await prisma.contact.findMany();
        return (res as any).status(200).json(result);
    } catch (e: any) {
        return (res as any).status(500).json({ message: e.message });
    } finally {
        await prisma.$disconnect();
    }

}

async function createContact(request: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse> {
    const req = request as any;
    const prisma = new PrismaClient();

    try {
        const data = req.body;

        if (!data.name) {
            return (res as any).status(404).json({ message: 'MissingName' });
        }

        const result = await prisma.contact.create({
            data: {
                name: data.name,
                phone: !!data.phone ? data.phone : null,
                email: !!data.email ? data.email : null,
                image: !!data.image ? data.image : null,
            }
        });

        return (res as any).status(200).json(result);
    } catch (e: any) {
        return (res as any).status(500).json({ message: e.message });
    } finally {
        await prisma.$disconnect();
    }
}
