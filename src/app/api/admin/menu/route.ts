import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, hint, price, image, category, orderIndex } = body;

    const newItem = await prisma.menuItem.create({
      data: {
        title,
        description,
        hint,
        price,
        image,
        category,
        orderIndex: orderIndex ? parseInt(orderIndex) : 0,
      },
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error("Error creating menu item:", error);
    return NextResponse.json({ error: 'Failed to create menu item' }, { status: 500 });
  }
}
