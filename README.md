# 2invoice.me

## HOW TO SETUP 2invoice.me DEMO FROM SCRATCH

1. First type "run git clone https://github.com/789-Productions/2invoice.me.git" on your terminal in your folder of choice. Make sure you are in the folder of the repository (should be the folder with the README file).

2. First install NodeJs, the latest version should be fine. Then type " npm install " to install all needed dependancies of this repo.

3. Install the latest version of MySQL server and MySQL workbench for your platform at https://dev.mysql.com/downloads/workbench/. MySQL 8.0.X and higher should work. Make sure your download includes specifically MySQL server and MySQL workbench. When configuring make sure to keep your port(default is 3306) and root password stored somewhere because they will be needed later.

4. Once MySQL server and workbench are set up, open MySQL workbench. You should see a welcome screen and from here you want to click the plus shaped button next to "MySQL connections" to set up a new connection. Click it and in the setup new connection window type a name for this connection we will use for this demo. In this tutorial we will call it 2invoice_local. Have hostname be localhost (127.0.0.1), port be 3306, username be root and blank schema and then press OK.

5. Now go into the folder of the repo and create a file named ".env" and in this you will want to copy paste the template from ".env.example" and replace the placeholder with "mysql://root:[rootpassword]@localhost:3306/2invoiceme_local", you can also replace the last name with whatever you named the connection if it was different.

6. While your here generate a random long string with this terminal command "openssl rand -base64 32" and input in our .env for NEXTAUTH_SECRET. If you are having trouble with Windows, run the command in bash if you can.

7. With our env and MySQL set up we can now setup our prisma file with a simple "npx prisma migrate dev" on our terminal. When it asks for a name for our migration you can put anything but I just put 2invoice_local. Along wit syncing our database with our schema it should have generated the primsa clint in our lib folder.

8. Now we can finally run "npm run dev" to run the website locally. Go to http://localhost:3000 and you should eventually see our demo's landing page.

9. To start press the seed database button to create intial data in our database in order to login. Optionally you can go to our database in MySQL workbench and run the Query "USE 2invoiceme_local; SELECT \* FROM USER;" to see our seed and database in action.

10. Now press the dashboard link on top and you should be met with a sign in page.

11. Enter demo@example.com for the email and demo1234 for the password to sign in. Click dashboard again and if successful you should see the dashboard page.

12. You can now create invoices (only 1 client in our demo) and on refresh you can see the newly created invoice on Recent invoices.
