import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { author, content, rating } = body;

    if (!author || !content) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const newReview = await prisma.review.create({
      data: {
        author,
        content,
        rating: rating || 5,
      },
    });

    return NextResponse.json(newReview);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}
