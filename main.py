from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from database import get_snowflake_connection

app = FastAPI()

# Allow frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for incoming vote data
class VoteItem(BaseModel):
    question_id: int
    option: str

class VoteRequest(BaseModel):
    votes: List[VoteItem]

# Question ID mapping
QUESTION_MAP = {
    1: "animal",
    2: "food",
    3: "drink",
}

@app.get("/")
def read_root():
    return {"message": "Voting API with Snowflake is running"}

@app.post("/vote")
def submit_vote(vote_data: VoteRequest):
    conn = get_snowflake_connection()
    cursor = conn.cursor()

    for item in vote_data.votes:
        question = QUESTION_MAP.get(item.question_id)
        if question:
            cursor.execute(
                "INSERT INTO votes (question, option) VALUES (%s, %s)",
                (question, item.option)
            )

    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Vote recorded in Snowflake"}

@app.get("/results")
def get_results():
    conn = get_snowflake_connection()
    cursor = conn.cursor()

    results = {
        "animal": {},
        "food": {},
        "drink": {}
    }

    for question in results.keys():
        cursor.execute(
            f"SELECT option, COUNT(*) FROM votes WHERE question = %s GROUP BY option",
            (question,)
        )
        for option, count in cursor.fetchall():
            results[question][option] = count

    cursor.close()
    conn.close()
    return results
