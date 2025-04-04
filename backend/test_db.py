from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Fetch database URL from .env (or fallback to default) 
DATABASE_URL = os.getenv("DATABASE_URL", "mysql+pymysql://root:your_password@localhost/hr_system")

# Create SQLAlchemy engine
engine = create_engine(DATABASE_URL)

def test_connection():
    try:
        with engine.connect() as connection:
            print("✅ Successfully connected to the MySQL database!")

            # Show all tables
            print("\nAll tables in database:")
            result = connection.execute(text("SHOW TABLES"))
            for row in result.fetchall():
                print(row)
                
            # Show roles table structure and data
            print("\nRoles table structure:")
            result = connection.execute(text("DESCRIBE roles"))
            for row in result.fetchall():
                print(row)
            
            print("\nRoles data:")
            result = connection.execute(text("SELECT * FROM roles"))
            for row in result.fetchall():
                print(row)
                
            # Show departments table structure and data
            print("\nDepartments table structure:")
            result = connection.execute(text("DESCRIBE departments"))
            for row in result.fetchall():
                print(row)
            
            print("\nDepartments data:")
            result = connection.execute(text("SELECT * FROM departments"))
            for row in result.fetchall():
                print(row)
                
            # Show users table structure
            print("\nUsers table structure:")
            result = connection.execute(text("DESCRIBE users"))
            for row in result.fetchall():
                print(row)
                
            # Show sample user data
            print("\nSample user data:")
            result = connection.execute(text("SELECT * FROM users LIMIT 5"))
            for row in result.fetchall():
                print(row)
    except Exception as e:
        print(f"Database connection failed: {e}")

if __name__ == "__main__":
    test_connection()
