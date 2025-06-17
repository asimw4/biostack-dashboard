# BioStack Dashboard 🧬📊

A lightweight machine learning dashboard that visualizes high-dimensional bioinformatics data using t-SNE, predicts `sirna_id` labels using LightGBM, and lets users explore sample-level predictions in an interactive 2D space.

---

## 🚀 Features

* 📈 t-SNE for 2D visualization of 128-dimensional embeddings
* 🤖 LightGBM classifier trained on top 20 `sirna_id` classes
* 🧪 Interactive dashboard with prediction labels
* 🔍 Metadata filtering by experiment, plate, and well
* ☁️ Deployed with Streamlit (or optionally on GCP/Cloud Run)

---

## 📁 Project Structure

```
BioStack Platform/
|
├── backend/
│   ├── main.py              # Streamlit app
│   ├── model.pkl            # Trained LightGBM model
│   ├── requirements.txt     # Python dependencies
|
├── dashboard/
│   └── dashboard_data.csv   # t-SNE + prediction + metadata
├── data/
│   ├── metadata.csv         # Sample metadata
│   └── embeddings.csv       # 128D image embeddings
├── Dockerfile               # (optional) for deployment
└── README.md
```

---

## 🧠 Model

* Classifier: `LightGBM`
* Features: 128-dimensional embeddings
* Labels: Top 20 most frequent `sirna_id` values

---

## 💻 Getting Started

### 1. Clone the repo:

```bash
git clone https://github.com/asimw4/Biostack-Backend.git
cd Biostack-Backend
```

### 2. Install requirements:

```bash
pip install -r requirements.txt
```

### 3. Run the app:

```bash
streamlit run main.py
```

---

## 🌐 Deployment

This app can be deployed via:

* **Streamlit Cloud**
* **Google Cloud Run** (with Dockerfile)
* **Local machine**

---

## 🧪 Sample Usage

* View predictions for a given well
* See where clusters form in t-SNE space
* Compare predicted vs actual `sirna_id`

---

## 📚 Requirements

See `requirements.txt` for dependencies.

---

## 🧑‍💻 Author

**Asim Waheed**
UT Austin | Data Science & Statistics

