from app import db
import enum
from datetime import datetime, timezone

# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     username = db.Column(db.String(80), unique=True, nullable=False)
#     password_hash = db.Column(db.String(128))

#     def set_password(self, password):
#         self.password_hash = generate_password_hash(password)

#     def check_password(self, password):
#         return check_password_hash(self.password_hash, password)

class ExpenseCategory(enum.Enum):
    FOOD = 'Food & Dining'
    AUTO = 'Auto & Transport'
    BILLS = 'Bills & Utilities'
    BUSINESS = 'Business Services'
    EDUCATION = 'Education'
    ENTERTAINMENT = 'Entertainment'
    FEES = 'Fees & Chargers'
    GIFTS = 'Gifts & Donations'
    HEALTH = 'Health & Fitness'
    HOME = 'Home'
    PERSONAL = 'Personal Care'
    PETS = 'Pets'
    SHOP = 'Shopping'
    TAXES = 'Taxes'
    TRAVEL = 'Travel'

class Expense(db.Model):
    __tablename__ = 'expenses'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    amount = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=False)
    # category = db.Column(db.String(100), nullable=False)
    category = db.Column(db.Enum(ExpenseCategory), nullable=False)
    date = db.Column(db.Date, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    def to_json(self):
        return {
            "id": self.id,
            "category": self.category.value,
            "amount": self.amount,
            "description": self.description,
            "date": self.date.strftime("%m/%d/%y")
        }
