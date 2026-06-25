import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, '').trim();
}

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

    const cleanAuthor = stripHtml(String(author)).slice(0, 100);
    const cleanContent = stripHtml(String(content)).slice(0, 1000);
    const safeRating = Math.min(5, Math.max(1, Number(rating) || 5));

    if (!cleanAuthor || !cleanContent) {
      return NextResponse.json({ error: "Invalid content" }, { status: 400 });
    }

    const newReview = await prisma.review.create({
      data: {
        author: cleanAuthor,
        content: cleanContent,
        rating: safeRating,
      },
    });

    return NextResponse.json(newReview);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}
