from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, Boolean, Enum, DateTime
from app.models import Base, UserRole
import os
from dotenv import load_dotenv
from datetime import datetime

# Load environment variables
load_dotenv()

# Database configuration
DATABASE_URL = os.getenv("DATABASE_URL", "mysql+pymysql://root:admin@localhost:3306/hr_system")

# Create SQLAlchemy engine
engine = create_engine(DATABASE_URL)

def create_tables():
    try:
        # Drop all tables first (to ensure clean state)
        Base.metadata.drop_all(bind=engine)
        print("Existing tables dropped successfully!")
        
        # Create tables
        Base.metadata.create_all(bind=engine)
        print("Tables created successfully!")
    except Exception as e:
        print(f"Error creating tables: {e}")

if __name__ == "__main__":
    create_tables() 