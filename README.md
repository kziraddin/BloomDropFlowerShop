# 🌸 BloomDrop - Flower Shop Web Application

BloomDrop is a full-stack web application designed to streamline the management of a flower shop's products, user accounts, and orders. This project showcases expertise in backend development, API integration, and frontend design as part of an academic collaboration.

## 🚀 Features

### 🌟 User Management
- ✍️ User registration and login with form validation

### 🌺 Product Management
- 🔍 Product search functionality with filters for easy navigation
- 📱 Dynamic product display with responsive CSS styling


## 🛠️ Technologies Used

### Backend
- **Django + Django REST Framework** (`Implementation/backend_django/`)
  - RESTful APIs for user, product, and order data.
  - JWT authentication via `djangorestframework-simplejwt` (1 hour access tokens).
- **PostgreSQL**
  - Django models and migrations; PostgreSQL runs in Docker locally and on Render's managed Postgres in production.

> The original Node.js/Express + Sequelize + MySQL backend (`Implementation/server.js`, `Implementation/backend/`) is **deprecated**. It is kept in the repository for reference only and is no longer used.

### Frontend
- **React.js** (`Implementation/frontend/`)
  - Modular and reusable UI components (e.g., SignUpForm, Navbar).
  - All API calls go through the shared axios instance in `src/api/config.js`, whose base URL comes from `REACT_APP_API_URL`.

## 🔌 API

| Method | Path | Description |
| --- | --- | --- |
| POST | `/users/register` | Create a user (400 on validation failure) |
| POST | `/users/login` | Returns `{ token, user: { id, email } }`; 401 on invalid credentials |
| GET/POST | `/users/` | List / create users |
| GET/PUT/DELETE | `/users/<id>/` | Retrieve / update / delete a user |
| GET/POST | `/products/` | List / create products |
| GET/PUT/DELETE | `/products/<id>/` | Retrieve / update / delete a product |
| GET/POST | `/orders/` | List / create orders |
| GET/PUT/DELETE | `/orders/<id>/` | Retrieve / update / delete an order |

Error bodies are `{"error": "..."}`; registration validation errors are `{"errors": [{"param": ..., "msg": ...}]}`.

## ⚙️ Local Setup

1. **Clone the repository and start PostgreSQL**
   ```
   git clone https://github.com/kziraddin/BloomDropFlowerShop.git
   cd BloomDropFlowerShop/Implementation
   docker compose up -d db
   ```

2. **Backend (Django)**
   ```
   cd backend_django
   python3 -m venv .venv && source .venv/bin/activate
   pip install -r requirements.txt
   cp .env.example .env          # then edit SECRET_KEY / JWT_SECRET
   python manage.py migrate
   python manage.py runserver 0.0.0.0:5500
   ```

3. **Tests**
   ```
   pytest
   ```
   pytest-django creates and drops a separate `test_bloomdrop` database.

4. **Frontend (React)**
   ```
   cd ../frontend
   npm install
   cp .env.example .env          # REACT_APP_API_URL=http://localhost:5500
   npm start
   ```
   Open http://localhost:3000 in your browser.

## ☁️ Deployment

Live environments:
- Backend API: https://bloomdrop-api.onrender.com
- Frontend: https://frontend-three-xi-77.vercel.app

### Backend → Render
- `render.yaml` (repository root) defines a Docker web service built from `Implementation/backend_django/Dockerfile` plus a managed PostgreSQL instance.
- Render injects `DATABASE_URL` from the managed database; `SECRET_KEY` and `JWT_SECRET` are generated, `DEBUG=False`, and `ALLOWED_HOSTS` is the Render domain.
- Migrations run from the container start command (`python manage.py migrate`), since Render pre-deploy commands require a paid instance type.
- After the frontend is deployed, set `CORS_ALLOWED_ORIGINS` to the Vercel domain and redeploy.

### Frontend → Vercel
- Set the Vercel project root directory to `Implementation/frontend` (build command `npm run build`, output directory `build`).
- Set `REACT_APP_API_URL` to the Render backend URL (it is read at build time, so redeploy after changing it).

### 🌱 Future Enhancements
-	💳 Integrate a payment gateway for seamless transactions.
-	🛠️ Add an admin panel for managing inventory and orders.
 
### 🤝 Contributors
**Ziraddin Kazimli**: Backend and API development, database schema design. Frontend design and React component development.

### 🚀 Example image and video of my project.
#### 📸  Main Page
<p align="center">
<img width="1440" alt="BloomDrop" src="https://github.com/user-attachments/assets/ac653a9a-2a93-4314-9df0-a3f7e5076a9a" />
</p>

#### 🎥  Video Link
https://drive.google.com/file/d/1IlzTRMdjsRssWMdFDTXqdRW5IdKC8qc9/view?usp=drive_link






