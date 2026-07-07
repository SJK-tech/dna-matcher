from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.ensemble import RandomForestClassifier
from Bio.Seq import Seq
import pandas as pd

app = Flask(__name__)
CORS(app)

LOCI = ["TH01", "D5S818", "D13S317", "vWA"]

def extract_features(crime, suspect):
    diffs = []
    matches = 0
    for locus in crime:
        diff = abs(crime[locus] - suspect[locus])
        diffs.append(diff)
        if diff == 0:
            matches += 1
    match_ratio = matches / len(crime)
    avg_diff = sum(diffs) / len(diffs)
    max_diff = max(diffs)
    return [match_ratio, avg_diff, max_diff]

@app.route("/api/analyze", methods=["POST"])
def analyze():
    data = request.json
    crime_profile = data["crimeProfile"]   # { "TH01": 8, "D5S818": 11, ... }
    suspects = data["suspects"]            # [{ "name": "John", "profile": {...} }]

    if len(suspects) < 2:
        return jsonify({"error": "Please provide at least 2 suspects for the model to train."}), 400

    X, y = [], []
    for suspect in suspects:
        f = extract_features(crime_profile, suspect["profile"])
        X.append(f)
        # Heuristic labeling
        if f[0] >= 0.75 and f[1] <= 1.0:
            y.append(1)
        else:
            y.append(0)

    # Ensure at least one of each class exists for training
    if len(set(y)) < 2:
        # Force last suspect as opposite class to allow training
        y[-1] = 1 - y[-1]

    model = RandomForestClassifier(n_estimators=50, random_state=42)
    model.fit(X, y)

    results = []
    for suspect in suspects:
        f = extract_features(crime_profile, suspect["profile"])
        pred = int(model.predict([f])[0])
        prob = float(model.predict_proba([f])[0][1])
        results.append({
            "name": suspect["name"],
            "matchRatio": round(f[0], 2),
            "avgDiff": round(f[1], 2),
            "maxDiff": f[2],
            "confidence": round(prob, 2),
            "status": "MATCH" if pred == 1 else "NO MATCH"
        })

    # Protein translation demo
    dna_seq = Seq("ATGGCCATTGTAATGGGCCGCTGAAAGGGTGCCCGATAG")
    protein = str(dna_seq.translate())

    return jsonify({
        "results": results,
        "loci": LOCI,
        "proteinExample": protein
    })

@app.route("/api/loci", methods=["GET"])
def get_loci():
    return jsonify({"loci": LOCI})

if __name__ == "__main__":
    app.run(port=5001, debug=True)
