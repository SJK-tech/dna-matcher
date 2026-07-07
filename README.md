# 🧬 STR-Based DNA Crime Matching System

A bioinformatics project that uses **Short Tandem Repeat (STR) analysis**, **Machine Learning**, and **Biopython** to compare DNA profiles and predict whether a suspect matches a crime scene DNA sample.

---

## 📖 Overview

DNA profiling is one of the most reliable methods used in forensic investigations. This project simulates the process of comparing DNA profiles using **STR (Short Tandem Repeat) markers**. The system accepts STR profiles of a crime sample and multiple suspects, extracts similarity-based features, and predicts whether a suspect is a match using a **Random Forest Machine Learning model**.

To demonstrate biological sequence processing, the project also integrates **Biopython** for DNA-to-protein translation.

---

## ✨ Features

- 🧬 STR-based DNA profile comparison
- 👥 Dynamic user input for crime and suspect profiles
- 🤖 Machine Learning classification using Random Forest
- 📊 Confidence score for each prediction
- 🧪 DNA to Protein translation using Biopython
- 📋 Tabular result visualization using Pandas
- ⚡ Command-line interactive interface

---

## 🧠 Biological Background

The project uses **Short Tandem Repeats (STRs)**, which are regions in DNA where short nucleotide sequences repeat multiple times.

The STR loci used are:

- TH01
- D5S818
- D13S317
- vWA

Each individual has different repeat counts at these loci, creating a unique DNA profile that can be compared for forensic identification.

---

## ⚙️ Technology Stack

- Python
- Biopython
- Scikit-learn
- Pandas
- Random Forest Classifier

---

## 🏗️ Project Workflow

```
Crime DNA STR Profile
            │
            ▼
     Suspect STR Profiles
            │
            ▼
     Feature Extraction
   • Match Ratio
   • Average Difference
   • Maximum Difference
            │
            ▼
 Machine Learning Model
 (Random Forest Classifier)
            │
            ▼
 Match / No Match Prediction
            │
            ▼
 Confidence Score + Report
```

---

## 📊 Feature Engineering

The model extracts three important features from STR profiles:

### Match Ratio
Percentage of STR loci that exactly match.

### Average Difference
Average difference in repeat counts across all loci.

### Maximum Difference
Largest mismatch between two DNA profiles.

These features are used to train the Random Forest classifier.

---

## 🧪 Biopython Integration

The project demonstrates biological sequence processing by translating a DNA sequence into its corresponding protein sequence.

Example:

```
DNA:
ATGGCCATTGTAATGGGCCGCTGAAAGGGTGCCCGATAG

Protein:
MAIVMGR*KGAR*
```

This demonstrates how DNA sequences are interpreted biologically.

---

## 🚀 Installation

Clone the repository

```bash
git clone https://github.com/yourusername/dna-crime-matching.git
```

Move into the project

```bash
cd dna-crime-matching
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run the application

```bash
python app.py
```

---

## 💻 Example

### Crime DNA

```
TH01 : 6
D5S818 : 9
D13S317 : 11
vWA : 18
```

### Suspect

```
TH01 : 6
D5S818 : 9
D13S317 : 11
vWA : 18
```

Output

```
MATCH
Confidence: 0.80
```

---

## 📂 Project Structure

```
dna-matcher
│
├── backend
│   ├── app.py
│   ├── requirements.txt
│   ├── model/
│   └── routes/
│
├── frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── README.md
└── report.pdf
```

---

## 🔮 Future Improvements

- Integration with real forensic STR datasets
- Support for additional STR loci
- Population genetics and likelihood ratio analysis
- Deep Learning-based DNA matching
- Interactive web dashboard
- DNA sequence visualization

---

## 📚 References

- Arthur M. Lesk – *Introduction to Bioinformatics*
- Biopython Documentation
- Scikit-learn Documentation
- National Center for Biotechnology Information (NCBI)
- FBI CODIS DNA Identification System

---

## 👩‍💻 Author

**Shreeya Kumar**

B.Tech – Information Science and Engineering  
BMS College of Engineering
