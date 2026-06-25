import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, hint, price, image, category, orderIndex } = body;

    const updatedItem = await prisma.menuItem.update({
      where: { id },
      data: {
        title,
        description,
        hint,
        price,
        image,
        category,
        orderIndex: orderIndex !== undefined ? parseInt(orderIndex) : 0,
      },
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("Error updating menu item:", error);
    return NextResponse.json({ error: 'Failed to update menu item' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.menuItem.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    return NextResponse.json({ error: 'Failed to delete menu item' }, { status: 500 });
  }
}
