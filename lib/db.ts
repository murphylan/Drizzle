import 'server-only';
import { Pool } from 'pg'; // PostgreSQL client
import { drizzle } from 'drizzle-orm/node-postgres';
import {
  pgTable,
  text,
  numeric,
  integer,
  timestamp,
  pgEnum,
  serial
} from 'drizzle-orm/pg-core'; // PostgreSQL core utilities
import { count, eq, ilike } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

// Create PostgreSQL connection pool
export const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, // Connection string from environment variables
});

// Configure Drizzle ORM to use PostgreSQL
export const db = drizzle(pool);

// Define the 'status' enum for product status
export const statusEnum = pgEnum('status', ['active', 'inactive', 'archived']);

// Define the product table structure
export const products = pgTable('products', {
  id: serial('id').primaryKey(),  // Primary key, auto-increment
  imageUrl: text('image_url').notNull(),  // Image URL, cannot be null
  name: text('name').notNull(),  // Product name, cannot be null
  status: statusEnum('status').notNull(),  // Product status, cannot be null
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),  // Product price, up to 10 digits with 2 decimal places
  stock: integer('stock').notNull(),  // Stock quantity, cannot be null
  availableAt: timestamp('available_at').notNull()  // Product availability date, cannot be null
});

// Define the type for selecting products
export type SelectProduct = typeof products.$inferSelect;

// Generate schema for inserting data using Drizzle-Zod
export const insertProductSchema = createInsertSchema(products);

// Function to get products with search and pagination support
export async function getProducts(
  search: string,  // Search keyword
  offset: number  // Pagination offset
): Promise<{
  products: SelectProduct[];  // List of products
  newOffset: number | null;  // New offset value
  totalProducts: number;  // Total number of products
}> {
  // If search keyword is provided, return matching products without pagination
  if (search) {
    return {
      products: await db
        .select()
        .from(products)
        .where(ilike(products.name, `%${search}%`))  // Use ILIKE for case-insensitive search on product name
        .limit(1000),  // Limit results to 1000 products
      newOffset: null,  // No offset for search queries
      totalProducts: 0  // Total products count is not needed for search queries
    };
  }

  // If no search keyword and offset is null, return empty data
  if (offset === null) {
    return { products: [], newOffset: null, totalProducts: 0 };
  }

  // Get total product count
  let totalProducts = await db.select({ count: count() }).from(products);

  // Get products based on the current offset and limit
  let moreProducts = await db.select().from(products).limit(5).offset(offset);

  // Determine if there are more products to paginate
  let newOffset = moreProducts.length >= 5 ? offset + 5 : null;

  return {
    products: moreProducts,  // Return the products fetched
    newOffset,  // Return the new offset value for pagination
    totalProducts: totalProducts[0].count  // Return the total product count
  };
}

// Function to delete a product by its ID
export async function deleteProductById(id: number) {
  await db.delete(products).where(eq(products.id, id));  // Delete the product by ID
}
