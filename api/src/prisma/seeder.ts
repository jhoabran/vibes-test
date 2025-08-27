import { PrismaClient } from "@prisma/client";
import { products } from "./products";

async function seed() {
    const db = new PrismaClient();
    console.log('Seeding database...');

    db.$connect();

    console.log('Connected to database');

    // Clear existing data
    await db.product.deleteMany();
    console.log('Cleared existing products');

    // Seed new data
    const result = await db.product.createMany({
        data: products,
    });

    console.log(`Added ${result.count} products to mini-market database`);
    console.log('Seeded database');

    db.$disconnect();
}

seed();