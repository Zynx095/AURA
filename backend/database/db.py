# Author: Yukith M Joseph | Atlantic Codes
# Purpose: Modular database connection layer

import os
import logging
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import ConnectionFailure

# Setup minimal logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("AURA.Database")

# Environment variables (fallback for local testing)
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "aura_db")

class Database:
    client: AsyncIOMotorClient = None
    db = None

db_instance = Database()

async def connect_to_database():
    """Establish connection to the database on startup."""
    try:
        logger.info(f"Connecting to database at {MONGO_URI}...")
        db_instance.client = AsyncIOMotorClient(MONGO_URI)
        db_instance.db = db_instance.client[DB_NAME]
        
        # Verify connection
        await db_instance.client.admin.command('ping')
        logger.info("Database connection established successfully.")
    except ConnectionFailure as e:
        logger.error(f"Failed to connect to database: {e}")
        raise e

async def close_database_connection():
    """Close connection gracefully on shutdown."""
    if db_instance.client is not None:
        db_instance.client.close()
        logger.info("Database connection closed.")

def get_db():
    """Dependency injection getter for the database instance."""
    return db_instance.db