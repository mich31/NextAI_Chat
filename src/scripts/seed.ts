const { sql } = require('@vercel/postgres');

async function main() {
    await sql`
        CREATE TABLE IF NOT EXISTS conversations (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            email TEXT NOT NULL,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT now(),
            updated_at TIMESTAMP DEFAULT now()
        );
    `;
    console.log(`Created "conversations" table`);
}
  
main().catch((err) => {
    console.error('An error occurred while attempting to seed the database:', err);
});
