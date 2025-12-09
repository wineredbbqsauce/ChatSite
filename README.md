# Chat Site

## Dette skal bli til en chat nettside der man skal kunne skive til hverandre, legge til bilder, lydfiler.

- Skrive meldinger
- Spille inn lydfiler
- Sende bilder, evt ta bilder direkte i siden

---

## Eventuelle ting som man kan legge til:

- Voice Call
- Streaming
- Groups / Server

---

### Under arbeid:

- Fikse en Landing / Home side
- Fikse slik at Registrer og Login funker slik den skal
- Koble sammen database (backend) og Forsiden (frontend)

---

## SETUP

### QUICK SETUP (Automated)

### Linux/Mac:

```bash
git clone https://github.com/wineredbbqsauce/ChatSite.git
cd ChatSite
chmod +x ./setup-LINUX-MAC.sh
sudo ./setup-LINUX-MAC.sh
```

### WINDOWS:

1. Download and Install [Node.js](https://nodejs.org/) (if not already installed)
2. Download and Install [MariaDB](https://mariadb.org/download/)

- During installation, set root password to: `1234`

3. Right-Click `setup-WINDOWS.bat` and select **"Run as administrator"**

---
## More Manual Setup (A bit automatic still)

---

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

#### INSTALL DEPENDENCIES MANUALLY IF "RUN AND INSTALL FILES" DID NOT WORK. **(MANUAL)**

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

###### **_to be continued..._**

---

###### All right served to me (BBQ Sauce Inc. Coop. Com. Org. Net.) <3
