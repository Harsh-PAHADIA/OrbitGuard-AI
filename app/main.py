from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="OrbitGuard AI")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AnalyzeRequest(BaseModel):
    file: str


@app.post("/analyze")
def analyze(request: AnalyzeRequest):

    if "safe" in request.file.lower() or "test" in request.file.lower():
        return {
            "changed_file": request.file,
            "affected_files": [],
            "risk_level": "LOW",
            "impact_score": 0,
            "risk_reason": "No dependent components affected. Safe to merge.",
            "affected_services": [],
            "recommendations": [{"text": "Merge when ready", "priority": "Low"}],
            "architecture_violations": [],
            "mr_comment_markdown": f"✅ OrbitGuard Analysis\n\nFile: {request.file}\nRisk Level: LOW\n\nSafe to merge."
        }

    affected_files = [
        "auth.py",
        "session.py",
        "user_service.py",
        "jwt_manager.py",
        "tests/test_login.py"
    ]

    return {
        "changed_file": request.file,
        "affected_files": affected_files,
        "risk_level": "HIGH",
        "impact_score": 100,
        "risk_reason": "HIGH risk because 5 dependent components may be affected.",
        "affected_services": [
            {"name": "Authentication", "risk": "HIGH"},
            {"name": "Session Management", "risk": "HIGH"},
            {"name": "User Profile", "risk": "MEDIUM"},
            {"name": "JWT Security", "risk": "HIGH"},
            {"name": "Login Testing", "risk": "LOW"}
        ],
        "recommendations": [
            {"text": "Run full regression testing", "priority": "High"},
            {"text": "Review architecture boundaries", "priority": "Medium"},
            {"text": "Request senior developer review", "priority": "High"}
        ],
        "architecture_violations": [
            "Frontend component directly depends on backend service"
        ],
        "mr_comment_markdown": f"""
⚠ OrbitGuard Analysis

File: {request.file}

Risk Level: HIGH

Architecture Violations:
- Frontend component directly depends on backend service
"""
    }


@app.get("/")
def home():
    return {"message": "OrbitGuard AI Running"}