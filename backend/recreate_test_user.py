from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from app.models import User
from passlib.context import CryptContext
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Database configuration
DATABASE_URL = os.getenv("DATABASE_URL", "mysql+pymysql://root:admin@localhost:3306/hr_system")

# Create SQLAlchemy engine and session
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def recreate_test_user():
    db = SessionLocal()
    try:
        # Delete existing user if exists
        db.execute(text("DELETE FROM users WHERE email = 'johndoe@example.com'"))
        db.commit()
        
        # Create new test user
        hashed_password = get_password_hash("password123")
        test_user = User(
            name="John Doe",
            email="johndoe@example.com",
            password_hash=hashed_password,
            role_id=3  # Employee role
        )
        
        db.add(test_user)
        db.commit()
        db.refresh(test_user)
        print(f"Test user recreated successfully: {test_user.name}")
    except Exception as e:
        print(f"Error recreating test user: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    recreate_test_user() 