<h1><p align="center">🎩 FullStack Admin Dashboard App | MNRN</p></h1>

<div align="center">

Admin Dashboard, созданный на основе стека MNRN и использующий собственные API

> 📝 [README EN](./README.md)</p>

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

### 🧾 Приложение включает в себя следующие страницы:

-   **Dashboard** ( Ключевые сведения по продажам, транзакциях )
-   **Client Facing**
    -   **Products** ( Список продуктов, с возможностью просмотра статистических сведений по каждому из них )
    -   **Customers** ( Список клиентов в табличном формате с возможностью сортировки и фильтрации )
    -   **Transactions** ( Список транзакций в табличном формате. Сортировка и пагинация происходит в server-side режиме )
    -   **Geography** ( Отображение географического положения пользователей )
-   **Sales**
    -   **Overview** ( Обзор общих доходов и прибыли )
    -   **Daily** ( График ежедневных продаж )
    -   **Monthly** ( График ежемесячных продаж )
    -   **Breakdown** ( Разбивка продаж по категориям )
-   **Management**
    -   **Admins** ( Список администраторов )
    -   **Performance** ( Отслеживание показателей собственных партнерских продаж )

## 📘 Data Model

<div align="center">

<img src="./server/data/DataModel.png" width="700"/>

Исходные данные расположены по пути [/server/data](./server/data/). Импортировать необходимо данные, находящиеся в json формате. Название файла соответствует названию коллекции.

</div>

## 💻 Quick Start

> 🔖 **Необязательно**: Перед началом можно изменить тестовые данные в [/server/.env](./server/) и [/client/.env](./client/) на те, которые вам необходимы.

### 1) Backend ( Разворачивается при помощи средств Docker Compose )

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

> P.S. Build создается в корневой папке проекта. Вы также можете вызвать команду для запуска build-версии на сервере:

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

Автор [Gusarovv](https://github.com/gusarovv) | Сделано с ❤️

Проект может быть использован для любых целей.

Пожалуйста, поставьте ⭐️ , если этот проект помог вам!
