from sqlalchemy import create_engine
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

def create_test_user():
    db = SessionLocal()
    try:
        # Check if user already exists
        existing_user = db.query(User).filter(User.email == "johndoe@example.com").first()
        if existing_user:
            print("Test user already exists in the database.")
            return
        
        # Create test user
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
        print(f"Test user created successfully: {test_user.name}")
    except Exception as e:
        print(f"Error creating test user: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    create_test_user() 