import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(request: NextApiRequest, res: NextApiResponse) {
    const req = request as any;
    if (req.method === 'PATCH') {
        return updateContact(req, res);
    }

    if (req.method === 'DELETE') {
        return deleteContact(req, res);
    }
}

async function updateContact(request: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse> {
    const req = request as any;
    const prisma = new PrismaClient();

    try {
        const data = req.body;

        if (!data.name) {
            return (res as any).status(404).json({ message: 'MissingName' });
        }

        const result = await prisma.contact.update({
            where: {
                id: parseInt(req.query.contact),
            },
            data: {
                name: data.name,
                phone: !!data.phone ? data.phone : null,
                email: !!data.email ? data.email : null,
                image: !!data.image ? `/api/images/${data.image}` : null,
            }
        });

        return (res as any).status(200).json(result);
    } catch (e: any) {
        return (res as any).status(500).json({ message: e.message });
    } finally {
        await prisma.$disconnect();
    }
}

async function deleteContact(request: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse> {
    const req = request as any;
    const prisma = new PrismaClient();

    try {
        const result = await prisma.contact.delete({
            where: {
                id: parseInt(req.query.contact),
            }
        });
        return (res as any).status(200).json(result);
    } catch (e: any) {
        return (res as any).status(500).json({ message: e.message });
    } finally {
        await prisma.$disconnect();
    }

}
