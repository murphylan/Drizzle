import {
  integer,
  numeric,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp
} from 'drizzle-orm/pg-core'; // PostgreSQL core utilities

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
