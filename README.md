ENGLISH

1. Running MySQL with Docker
If you are using Docker for MySQL, first make sure to start the MySQL container. Here’s how:

Build and run Docker Compose to start MySQL:
docker-compose up --build
If you don't have a docker-compose.yml file yet, make sure to create one with the proper configuration.

2. Running the Database Seeder
Before running the backend, you need to execute the seeder to populate the database with initial data.

Run the Seeder on the Backend:
Usually, the seeder script is located inside the src/seeders or database/seeders folder.
You can run the seeder with the following command:
npm run seed
If you're using TypeScript, you might need to run it with:
ts-node ./path/to/seed-script.ts
ts-node ./krom-backend/seeds/seed.sql

3. Running the Backend (BE)
Once the database is populated, you can start the backend server.

Install backend dependencies:
Make sure you are inside the krom-backend folder and run:
npm install (in krom-backend file)
Start the backend server:
After installing all dependencies, run:
npm run dev (in krom-backend file)
If you are using TypeScript directly, you can also start the server using ts-node-dev:
ts-node-dev --respawn --transpileOnly src/index.ts

4. Running the Frontend (FE)
Finally, you can start the frontend application, usually built with ReactJS.

Install frontend dependencies:
Navigate to the krom-frontend folder and run:
npm install (in krom-frontend file)
Start the frontend server:
npm run dev (in krom-frontend file)

5. Check and Verify
After running all parts, make sure the backend and frontend are properly connected.
Test if the backend APIs are working correctly and the frontend can access them.




INDONESIA

1. Menjalankan MySQL dengan Docker
Jika Anda menggunakan Docker untuk MySQL, pertama-tama pastikan Anda menjalankan kontainer MySQL. Berikut langkah-langkahnya:

Build dan jalankan Docker Compose untuk memulai MySQL:
docker-compose up --build
Jika Anda belum memiliki file docker-compose.yml, pastikan Anda menambahkannya dengan konfigurasi yang sesuai.

2. Menjalankan Seeder untuk Database
Sebelum menjalankan backend, pastikan Anda menjalankan seeder untuk mengisi data awal ke dalam database.

Menjalankan Seeder di Backend: Biasanya, seeder berada di folder src/seeders atau database/seeders. Anda bisa menjalankan script seeder dengan perintah berikut:
npm run seed
Atau jika menggunakan TypeScript:

ts-node ./path/to/seed-script.ts
ts-node ./krom-backend/seeds/seed.sql

3. Menjalankan Backend (BE)
Setelah database siap dengan data awal, Anda dapat menjalankan server backend.

Install dependencies untuk backend: Pastikan Anda sudah menginstall dependencies:
npm install di dalam file krom-backend
Menjalankan server backend: Setelah semua dependensi terinstal, Anda dapat menjalankan backend menggunakan perintah berikut:
npm run dev di dalam file krom-backend
Atau, jika menggunakan TypeScript, pastikan ada script yang menjalankan kompilasi dan server, misalnya dengan ts-node:

ts-node-dev --respawn --transpileOnly src/index.ts

4. Menjalankan Frontend (FE)
Terakhir, jalankan aplikasi frontend yang biasanya dibangun dengan ReactJS.

Install dependencies untuk frontend: Pastikan Anda sudah menginstall semua dependensi frontend:
npm install di dalam file krom-frontend
Menjalankan server frontend: Setelah dependensi terinstal, Anda bisa menjalankan frontend dengan:
npm run dev di dalam file krom-frontend

5. Cek dan Verifikasi
Setelah menjalankan ketiga bagian di atas, pastikan backend dan frontend dapat saling terhubung. Cek API dari backend apakah berjalan dengan benar dan frontend dapat mengaksesnya.
