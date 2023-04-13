## Disclaimer

This project was created for study and portfolio purposes.
Feel free to go around the code and run it by yourself. It's not for commercial purposes, so you can use my code and ideas for whatever you want. Just remember to give me the credits you enjoy it.

## Description

MyPocket is a simple web application for managing personal finances.
With the application the user can register and start importing the daily transactions and creating monthly budgets to control expenses.
There is a dashboard where the user can get an overview of how the finances are going.

![dashboard](images/dashboard.png 'dashboard')

## Getting Started

### Project Architecture

The project was designed to have a backend and frontend running separatedly.

### Run the project

1. Clone the repository

`git clone https://github.com/danielfreitas662/MyPocket.com.git`

2. Go to MyPocket.Backend folder and run the project

`dotnet watch run --project MyPocket.API`

The API should run on https://localhost:7220/
The endpoints of the API will be available at the base address https://localhost:7220/api/

3. Go to MuPocket.Frontend folder and run the project

`npm run dev`

The web application should run on http://localhost:3000/

## Main Technologies

### Backend

Click [here](https://github.com/danielfreitas662/MyPocket.com/tree/main/MyPocket.Backend) to view backend code.

#### Framework

.NET 6 (c#)

#### Database

PostgreSQL

### Frontend

#### Framework

Next.js 13 (experimental to this date)
React.js (TypeScript)
SASS

#### Libraries

I tried to implement everything I could to avoid using of external libraries.
The only dependencies are:

1. [appexcharts](https://github.com/apexcharts):
   Plotting charts on screen for the dashboard
2. [clsx](https://github.com/lukeed/clsx):
   Conditionally insert classes on the components
3. [jose](https://github.com/panva/jose):
   Managing JWT
4. [react-hook-form](https://github.com/react-hook-form/react-hook-form):
   Managing forms
5. [react-icons](https://github.com/react-icons/react-icons):
   SVG
6. [react-toastify](https://github.com/fkhadra/react-toastify):
   Notifications popups

## Screensshots

### Public Home screen for non authenticated users

![home](images/home.png 'home')

### Public About screen for non authenticated users

![about](images/about.png 'about')

### Public Contact screen for non authenticated users

![contact](images/contact.png 'contact')

### Public Signup screen for non authenticated users

![signup](images/signup.png 'signup')

### Public Login screen for non authenticated users

![login](images/login.png 'login')

### Private Dashboard screen for authenticated users

![dashboard](images/dashboard.png 'dashboard')

### Private Transactions screen for authenticated users

![transactions](images/transactions.png 'transactions')

### Private Transaction Form screen for authenticated users

![newtransaction](images/newtransaction.png 'newtransaction')

### Private Accounts screen for authenticated users

![accounts](images/accounts.png 'accounts')

### Private Account Form screen for authenticated users

![accountform](images/newaccount.png 'accountform')

### Private Categories screen for authenticated users

![categories](images/categories.png 'categories')

### Private Category Form screen for authenticated users

![newcategory](images/newcategory.png 'newcategory')
