# Personal Finance Tracker & Analysis Engine

A hybrid full-stack application designed to manage personal financial data and perform statistical trend analysis. The system consists of three parts:
1.  **Frontend:** A vanilla JavaScript interface (requires a local server).
2.  **Backend:** Node.js/Express API that manages the database and spawns the analysis engine.
3.  **Analysis Engine:** A Python script triggered by the backend to calculate financial trends.

## Features
* **Hybrid Architecture:** Node.js handles API requests, while Python is spawned as a subprocess for heavy numerical analysis.
* **User Management:** Secure authentication (Login/Signup) with MongoDB.
* **Real-time Analysis:** The `/analyze` endpoint automatically triggers a Python script to calculate budget trends.
* **Data Tracking:** Manages Transactions, Budgets, and Savings Pots.

---

## Mathematical Methodology: Trend Calculation

The application uses **Ordinary Least Squares (OLS) Linear Regression** to determine the user's spending trajectory based on the data sent to the `/analyze` endpoint.

### The Algorithm
We model the relationship between **Time** (independent variable X) and **Transaction Amount** (dependent variable y).

y = mx + c

Where:
* y: The predicted cumulative spending.
* x: The date (converted to an ordinal integer).
* m: The **slope** (The Trend).
* c: The y-intercept.

### Calculation Logic
The Python script minimizes the sum of squared residuals to find the line of best fit:

1.  **Data Extraction:** Fetches the `transactionList` array passed from the Node.js parent process.
2.  **Preprocessing:** Converts ISO dates to ordinal format (integers representing days) to allow mathematical operations.
3.  **Fitting:** Uses `scikit-learn` to calculate the slope (m).

### Interpreting the Results
The slope (m) determines the financial health trend:
* **m > 0 (Positive Slope):** Indicates an upward trend (spending is increasing).
* **m < 0 (Negative Slope):** Indicates a downward trend (spending is decreasing).
* **Magnitude:** The steepness of the slope indicates the rate of change per day.

## Setup & Installation

### Prerequisites
* **Node.js** (v14+)
* **Python** (v3.8+) - *Must be in your system PATH.*
* **MongoDB Atlas** Connection String

### A. Clone the Repository
```bash
git clone [https://github.com/yourusername/finance-tracker.git](https://github.com/yourusername/finance-tracker.git)
cd finance-tracker

```

### B. Install Dependencies

**1. Backend (Node.js):**

```bash
npm install

```

**2. Analysis Engine (Python):**

```bash
pip install pandas numpy scikit-learn

```

### C. Environment Configuration

Create a `.env` file in the root directory:

```env
# Database Connection
MONGODB_URL=mongodb+srv://<user>:<pass>@cluster0.v3rcx.mongodb.net/financeDB?retryWrites=true&w=majority

# Server Port
PORT=3000

```

---

### Running the Application

You must run the **Backend** and the **Frontend** simultaneously.

### Step 1: Start the Backend API

Open a terminal in the root folder and run:

```bash
node server.js

```

* **Success:** You should see `Server listening to port 3000`.
* **Note:** Keep this terminal open. This handles database connections and runs the Python analysis.

### Serve the Frontend

Because the frontend uses ES6 Modules (imports/exports), **you cannot simply double-click `index.html`.** You must serve it.

**Option A: Using Python (Recommended)**
Open a **new** terminal window, navigate to your project folder, and run:

```bash
# Windows
python -m http.server

# Mac/Linux
python3 -m http.server

```

Then, open your browser to `http://localhost:8000`.

**Option B: Using VS Code "Live Server"**

1. Open the project folder in VS Code.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and select **"Open with Live Server"**.
