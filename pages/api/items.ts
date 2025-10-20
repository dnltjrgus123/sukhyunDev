import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../lib/db';
import Item from '../../../lib/models/Item';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'GET') {
    const items = await Item.find({});
    return res.status(200).json(items);
  }

  if (req.method === 'POST') {
    const { title, price, sellerId } = req.body;
    const newItem = await Item.create({ title, price, sellerId });
    return res.status(201).json(newItem);
  }

  res.status(405).json({ message: 'Method not allowed' });
}