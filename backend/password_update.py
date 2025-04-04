from sqlalchemy import create_engine, text
import bcrypt
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Database connection
DATABASE_URL = os.getenv("DATABASE_URL", "mysql+pymysql://root:your_password@localhost/hr_system")
engine = create_engine(DATABASE_URL)

# Generate new password hash
new_password = "admin"
hashed_password = bcrypt.hashpw(new_password.encode(), bcrypt.gensalt()).decode()

# Update database
with engine.connect() as connection:
    connection.execute(text("UPDATE users SET password_hash = :hashed_password"), {"hashed_password": hashed_password})
    connection.commit()  # Ensure changes are saved
    print("All passwords updated to 'admin'.")
