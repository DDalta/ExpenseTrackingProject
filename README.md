# Expense Tracker App

[A brief description of your project: What it does, what technologies it uses, etc. Mention that the frontend is pre-built and served by the Python backend or accessible via [URL/method].]

## Prerequisites

Before you begin, ensure you have the following installed:

- **Python:**  (Version 3.x recommended)
- **pip:** (Python's package installer, usually comes with Python)

## Project Setup (Backend)

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/DDalta/ExpenseTrackingProject.git
    cd ExpenseTrackingProject
    ```

2.  **Navigate to the backend directory (if applicable):**
    ```bash
    cd backend
    ```

3.  **Create and activate a virtual environment (recommended):**
    ```bash
    # For Windows
    python -m venv venv
    .\venv\Scripts\activate

    # For macOS and Linux
    python3 -m venv venv
    source venv/bin/activate
    ```

4.  **Install Python dependencies:**
    Ensure your `requirements.txt` file is in the current directory (or specify the path).
    ```bash
    pip install -r backend/requirements.txt
    ```
## Starting the Backend Server

1.  **Ensure your Python virtual environment is activated.**
2.  **Run the Flask application:**
    ```bash
    python backend/app.py
    ```
    The backend server will typically start on `http://127.0.0.1:5000/` . Check your Flask configuration for the exact host and port.
3. **Go to the address on your browser**