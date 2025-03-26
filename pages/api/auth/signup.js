import { hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    // Hash the password
    const hashedPassword = await hash(password, 10);

    try {
      const newUser = await prisma.user.create({
        data: { name, email, password: hashedPassword },
      });

      return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      return res.status(400).json({ error: 'User already exists' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
