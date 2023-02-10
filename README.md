<h1><p align="center">🎩 FullStack Admin Dashboard App | MNRN</p></h1>

<div align="center">

Admin Dashboard, created based on the MNRN stack and using its own APIs

> 📝 [README RU](./README_RU.md)</p>

</div>

## 💻 Stack

<div align="center">

![NodeJS](https://img.shields.io/badge/node.js-%236DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![JsonWebToken](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Bcrypt](https://img.shields.io/badge/Bcrypt-%23cf402a?style=for-the-badge&logo=bcrypt&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-%23B7178C?style=for-the-badge&logo=ReactiveX&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-%23a03333?style=for-the-badge&logo=mongoose&logoColor=white)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![MUI X](https://img.shields.io/badge/MUI%20X-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![Nivo](https://img.shields.io/badge/Nivo-%23ff8c80?style=for-the-badge&logo=nivo&logoColor=white)
![Luxon](https://img.shields.io/badge/Luxon-%238065b4?style=for-the-badge&logo=luxon&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23764ABC.svg?style=for-the-badge&logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/react%20router-%23CA4245.svg?style=for-the-badge&logo=react-router&logoColor=white)
![RTK Query](https://img.shields.io/badge/RTK%20Query-%23764ABC.svg?style=for-the-badge&logo=redux&logoColor=white)

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)

</div>

## ✍️ Description

### 🧾 This application includes the following pages::

-   **Dashboard** ( Basic information about sales, transactions )
-   **Client Facing**
    -   **Products** ( A list of products with the ability to view statistical information for each of them. )
    -   **Customers** ( A list of clients in a tabular format with the ability to sort and filter. )
    -   **Transactions** ( A list of transactions in tabular format. Sorting and pagination takes place in server-side mode )
    -   **Geography** ( View the geographical location of users. )
-   **Sales**
    -   **Overview** ( Overview of total revenues and profits )
    -   **Daily** ( Daily sales chart )
    -   **Monthly** ( Monthly sales chart )
    -   **Breakdown** ( Breakdown of sales by category )
-   **Management**
    -   **Admins** ( List of administrators )
    -   **Performance** ( Tracking the performance of your own affiliate sales )

## 📘 Data Model

<div align="center">

<img src="./server/data/DataModel.png" width="700"/>

The source data is located at the path [/server/data](./server/data/). It is necessary to import data in json format. The file name corresponds to the name of the collection.

</div>

## 💻 Quick Start

> 🔖 **Optional**: Before you start, you can change the data in [/server/.env](./server/) and [/client/.env](./client/) to the ones you need.

### 1) Backend ( It is deployed using Docker Compose tools )

#### For development:

```bash
cd ./server/ && docker compose up dev
```

#### For production:

```bash
cd ./server/ && docker compose up -d prod
```

### 2) Импорт данных из [/server/data](./server/data/)

### 3) Frontend

#### For development:

```bash
cd ../client && npm run start
```

#### For production build:

```bash
cd ../client && npm run build
```

> P.S. The build directory containing the production build is created within the root project folder. You can also run the following command to serve the build version in a static server:

```bash
npm install -g serve && serve -s build
```

## 🖼️ Demo

-   <details open>
      <summary><h3>🖥️ Dashboard</h3></summary>
      <div align="center"> 
        <img src="./demo/dashboard.png"/>
      </div>
    </details>

-   <details>
      <summary><h3>📦 Products</h3></summary>
      <div align="center"> 
        <img src="./demo/products.png"/>
      </div>
    </details>

-   <details>
      <summary><h3>👥 Customers</h3></summary>
      <div align="center"> 
        <img src="./demo/customers.png"/>
      </div>
    </details>

-   <details>
      <summary><h3>💱 Transactions</h3></summary>
      <div align="center"> 
        <img src="./demo/transactions.png"/>
      </div>
    </details>

-   <details>
      <summary><h3>🌎 Geography</h3></summary>
      <div align="center"> 
        <img src="./demo/geography.png"/>
      </div>
    </details>

-   <details>
      <summary><h3>💰 Overview</h3></summary>
      <div align="center"> 
        <img src="./demo/overview.png"/>
      </div>
    </details>

-   <details>
      <summary><h3>📈 Daily</h3></summary>
      <div align="center"> 
        <img src="./demo/daily.png"/>
      </div>
    </details>

-   <details>
      <summary><h3>📉 Monthly</h3></summary>
      <div align="center"> 
        <img src="./demo/monthly.png"/>
      </div>
    </details>

-   <details>
      <summary><h3>📊 Breakdown</h3></summary>
      <div align="center"> 
        <img src="./demo/breakdown.png"/>
      </div>
    </details>

-   <details>
      <summary><h3>💼 Admins</h3></summary>
      <div align="center"> 
        <img src="./demo/admins.png"/>
      </div>
    </details>

-   <details>
      <summary><h3>🏆 Performance</h3></summary>
      <div align="center"> 
        <img src="./demo/performance.png"/>
      </div>
    </details>

## 📄 Credits

Made by [Gusarovv](https://github.com/gusarovv) with ❤️

The project can be used for any purpose.

Please give a ⭐️ if this project helped you!
