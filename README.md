# ***ChatSite 💬🔥***

## **A modern real-time chat platform built with Node.js, React, and MariaDB. Chat with friends, send images, record voice messages — with even more features planned.**
## **✨ Features**
### ✅ Current

- 💬 Real-time messaging between users


### 🪏 Under Construction

- 🔐 User authentication (Register & Login)

- 🎨 UI redesign & animations


### 🚧 Planned / Upcoming

- 🎤 Voice message recording

- 🖼️ Image sharing (upload or take photos directly)

- 📞 Voice calls

- 📺 Live streaming

- 👥 Groups / Servers

- 📱 Improved mobile experience

---

## **🧱 Tech Stack**

**Frontend:** React

**Backend:** Node.js, Express

**Database:** MariaDB

**Authentication:** Custom auth system

**Other:** Node scripts for setup & automation

---
## **SETUP**

### 🚀 Quick Setup (Recommended)
### *Linux/Mac:*

```bash
git clone https://github.com/wineredbbqsauce/ChatSite.git
cd ChatSite
chmod +x ./setup-LINUX-MAC.sh
sudo ./setup-LINUX-MAC.sh
```

### *WINDOWS:*

1. Download and Install [Node.js](https://nodejs.org/) (if not already installed)
2. Download and Install [MariaDB](https://mariadb.org/download/)

    - During installation, set root password to: `1234`

3. Right-Click `setup-WINDOWS.bat` and select **"Run as administrator"**

---
## **⚙️ Manual Setup (Advanced)**

### 1. Clone The Repository:

```bash
    git clone https://github.com/wineredbbqsauce/ChatSite.git

    cd ChatSite
```

### 2. Install all the dependencies and build:

```bash
    npm run setup
```

### 3. Configure your databse in `config/config.env`:

```env
    DB_HOST={your_host, (eks: localhost)}
    DB_USER={your_user}
    DB_PASSWORD={your_password}
    DB_NAME=chatsitedb
    PORT=25565
```

### 4. Start the server:

```bash
    npm start
```

---

---

## **🛠️ Full Manual Install (Fallback)**

|   Use this only if automated setup fails

##### 1. Clone Repository

```bash
1. git clone -b backup-before-undo https://github.com/wineredbbqsauce/ChatSite.git (as for now)
2. cd ChatSite
```

##### 2. Install Backend Dependencies

```bash
1. cd backend/
2. npm install
```

##### 3. Install Frontend Dependencies

```bash
1. cd ../frontend
2. npm install react-scripts@5.0.1 --save
3. npm install
```

#### 4. Create Config.env

```bash
cd config/
*(Linux or Mac)* touch config.env
*(Windows)* type nul > config.env
```
### 5. Configure your databse in `config/config.env`:

```env
    DB_HOST={your_host, (eks: localhost)}
    DB_USER={your_user}
    DB_PASSWORD={your_password}
    DB_NAME=chatsitedb
    PORT=25565
```
```bash
cd ..
cd ..
```

##### 6. Build the Frontend

```bash
cd frontend
1. npm run build
```

##### 7. Change Directory

```bash
1. cd ..
2. cd backend/
```

##### 8. Start Server

```bash
1. npm run dev
```

###### (using _run dev_ for now..)

## **🧪 Status**

**🚧 This project is still under active development**

Expect bugs, unfinished features, and frequent changes.

---

## 🤝 Contributing
Pull requests, ideas, and feedback are welcome. Feel free to fork the project and experiment.

---

###### Built with ❤️, caffeine ☕, fent and questionable decisions
© BBQ Sauce Inc. Coop. Com. Org. Net.
