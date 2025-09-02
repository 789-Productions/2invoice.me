# Initial Database Migration Set Up

1. Run 'npx prisma migrate resolve --applied "20250829193111_init"' (reset your database if neccessary)

2. Then run 'npx prisma migrate deploy' whiich should run the next migration file.

# What to do when making a Database Schema Change

1. Make a change to schema.prisma

2. Run "npx prisma migrate dev --name <choose_name_here> in development to create a migration file that will change the database to the new schema from the old schema

3. Push this new migration file to production/main

4. When pulling this new migration file from production all that is left to do is run "npx prisma migrate deploy" to safely apply the new changes.
