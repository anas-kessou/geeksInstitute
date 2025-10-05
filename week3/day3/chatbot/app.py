# app.py -- SIMPLE ethical-hacking chatbot backend (single file)
import os
import re
from flask import Flask, request, jsonify
import requests
from dotenv import load_dotenv

load_dotenv()  # loads .env

# Read from .env as requested
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
BASE_URL = os.getenv("BASE_URL", "https://models.github.ai")
MODEL_NAME = os.getenv("MODEL_NAME", "openai/gpt-4.1")

if not GITHUB_TOKEN:
    raise RuntimeError("GITHUB_TOKEN is not set. Put it in .env as GITHUB_TOKEN=...")

app = Flask(__name__)

# Very small intent checker: refuses obvious malicious requests
MALICIOUS_KEYWORDS = [
    "ddos", "ransomware", "malware", "exploit", "sqlmap",
    "unauthorized", "hack into", "backdoor", "bypass", "payload"
]
TARGET_PATTERN = re.compile(r"(https?://)?([0-9]{1,3}\.){3}[0-9]{1,3}|([a-z0-9-]+\.)+[a-z]{2,}", re.I)

SYSTEM_PROMPT = (
    "You are a cybersecurity tutor and lab assistant. "
    "Provide legal, ethical, defensive guidance only. "
    "Refuse any request that would enable unauthorized access, malware creation, or attacks. "
    "When refusing, offer safe alternatives like CTFs, local lab setups, detection, and remediation."
)

def is_malicious(text: str) -> dict:
    t = (text or "").lower()
    reasons = []
    for kw in MALICIOUS_KEYWORDS:
        if kw in t:
            reasons.append(f"keyword: {kw}")
    if TARGET_PATTERN.search(text):
        reasons.append("mentions a target (domain/IP)")
    verdict = "safe"
    if reasons:
        # conservative: treat as malicious if contains strong attack words
        if any(k in t for k in ["ransomware", "malware", "ddos", "exploit"]):
            verdict = "malicious"
        else:
            verdict = "suspicious"
    return {"verdict": verdict, "reasons": reasons}

def call_model(user_text: str) -> str:
    headers = {
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "Content-Type": "application/json"
    }
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": user_text}
    ]
    payload = {
        "model": MODEL_NAME,
        "messages": messages,
        "max_tokens": 600,
        "temperature": 0.2
    }
    # OpenAI-compatible endpoint for GitHub Models
    url = f"{BASE_URL}/v1/chat/completions"
    resp = requests.post(url, json=payload, headers=headers, timeout=30)
    resp.raise_for_status()
    data = resp.json()
    # adapt if your GPT-5 API returns different structure
    return data["choices"][0]["message"]["content"]

@app.route("/api/health")
def health():
    return jsonify({"status": "ok"})

@app.route("/api/chat", methods=["POST"])
def chat():
    body = request.get_json(force=True)
    text = body.get("message", "")
    if not text:
        return jsonify({"error": "no message provided"}), 400

    intent = is_malicious(text)
    if intent["verdict"] == "malicious":
        return jsonify({
            "error": "refused",
            "message": "I can't help with requests that enable attacks or malware.",
            "alternatives": [
                "I can teach defensive techniques, detection, threat modeling, secure coding, or suggest legal CTFs and local labs."
            ],
            "safety": intent
        }), 403

    # If suspicious, give a gentle warning but still proceed (optional)
    if intent["verdict"] == "suspicious":
        # you can choose to refuse here; this example warns and proceeds
        warning = "Warning: your message looks like it may mention targets or sensitive topics. Proceeding with defensive-focused response."
    else:
        warning = None

    try:
        reply = call_model(text)
    except Exception as e:
        return jsonify({"error": "model_error", "detail": str(e)}), 500

    result = {"response": reply, "safety": intent}
    if warning:
        result["warning"] = warning
    return jsonify(result)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 8000)))
