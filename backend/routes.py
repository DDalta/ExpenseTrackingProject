from app import app, db
from flask import request, jsonify
from models import Expense
from datetime import date
from sqlalchemy.sql import func

@app.route('/api/expense', methods=['GET'])
def get_expenses():
    expenses = Expense.query.all()
    result = [expense.to_json() for expense in expenses]
    return jsonify(result)

@app.route('/api/expense/total', methods=['GET'])
def get_total_expense():
    try:
        total_amount_query = db.session.query(func.sum(Expense.amount)).scalar()
        total_amount = total_amount_query if total_amount_query is not None else 0.0
        return jsonify({"total_expenses": total_amount}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/expense', methods=['POST'])
def create_expense():
    try:
        data = request.json

        required_fields = ["amount", "description", "category", "date"]
        for field in required_fields:
            if field not in data or not data.get(field):
                return jsonify({"error": f'Missing required field: {field}'}), 400

        amount = float(data.get("amount"))
        description = data.get("description")
        category = data.get("category")
        date_str = data.get("date")
 
        new_expense = Expense(amount=amount, description=description, category=category, date=date.fromisoformat(date_str)
)

        db.session.add(new_expense)
        db.session.commit()

        return jsonify(new_expense.to_json()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/expense', methods=['DELETE'])
def delete_expenses():
    data = request.json
    expenses_to_delete = data.get('ids')
    
    if not expenses_to_delete:
        return jsonify({"error": "No IDs provided for deletion"}), 400
    
    try:
        for id in expenses_to_delete:
            expense = Expense.query.get(id)
            if expense is None:
                return jsonify({"error": f"Expense ID: {id} not found"}), 404
            db.session.delete(expense)
        db.session.commit()
        return jsonify({"msg": "deleted expenses"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500