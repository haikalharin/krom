ENGLISH
#if with docker enter this prompt into the terminal sequentially

docker-compose up --build

#for check status container

docker-compose ps

#For access DB

mysql -h 127.0.0.1 -P 3307 -u root -p

#if with LOCAL Mysql

please Create krom_db in your local DB mysql

   - DB_HOST=localhost
      - DB_USER=root
      - DB_PASSWORD=
      - DB_NAME=krom_db
      - DB_PORT=3306


to run the project, enter this prompt into the terminal sequentially

Krom-BACKEND

INITIAL

cd krom-backend

npm install

npm run dev:with-seeds

Note: When running npm run dev:with-seeds, the seed is already yellow because it has been set in the package.json file

RUN WITHOUT SEEDS

npm run dev



Krom-FRONT

cd krom-frontend

npm install

npm run dev


then the application can be used

📦 Conclusion

Project How It Works

INITIAL
krom-backend	cd krom-backend && npm install && npm run dev:with-seeds

WITHOUT SEEDS
krom-backend cd krom-backend && npm install && npm run dev

krom-frontend cd krom-frontend && npm install && npm run dev



INDONESIA

#jika menggunakan docker masukan prompt ini ke terminal secara berurutan

docker-compose up --build

#untuk cek status container

docker-compose ps

#Untuk akses DB

mysql -h 127.0.0.1 -P 3307 -u root -p

#Jika menggunakan LOCAL Mysql

tolong tambahkan "krom_db" ke dalam local db mySql di device anda

      - DB_HOST=localhost
      - DB_USER=root
      - DB_PASSWORD=
      - DB_NAME=krom_db
      - DB_PORT=3306



untuk menjalakan project masukan promp ini ke terminal secara berurutan

INITIAL

cd krom-backend

npm install

npm run dev:with-seeds

Note:  Ketika menjalankan npm run dev:with-seeds sudah teruning juga seedsnya karena sudah di set dalam file package.json

RUN TANPA SEEDS

npm run dev


Krom-FRONTEND

cd krom-frontend

npm install

npm run dev


maka aplikasi sudah dapat digunakan

📦 Kesimpulan


Project	Cara Runing

INITIAL
krom-backend	cd krom-backend && npm install && npm run dev:with-seeds

TANPA SEEDS
krom-backend	cd krom-backend && npm install && npm run dev

krom-frontend	cd krom-frontend && npm install && npm run dev


