import {
    pgTable,
    uniqueIndex,
    varchar,
    text,
    vector,
} from "drizzle-orm/pg-core";

export const userTable = pgTable(
    "users",
    {
        id: varchar("id", { length: 256 }).primaryKey(),
        name: varchar("name", { length: 256 }),
        email: varchar("email", { length: 256 }),
    },
    (table) => {
        return {
            emailIndex: uniqueIndex("user_email_index").on(table.email),
        };
    }
);

export const datasetTable = pgTable("datasets", {
    id: varchar("id", { length: 256 }).primaryKey(),
    content: text("content").notNull(),
    embedding: vector("embedding", { dimensions: 1536 }),
});

export const schema = {
    user: userTable,
    dataset: datasetTable,
};
