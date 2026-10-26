# ☁️ Cloud-Native CI/CD Pipeline & DevOps Practice

[![CI workflow](https://github.com/ongunakaycom/ibm-developer-skills-network-wtecc-CICD_Practice/actions/workflows/workflow.yml/badge.svg)](https://github.com/ongunakaycom/ibm-developer-skills-network-wtecc-CICD_Practice/actions/workflows/workflow.yml)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker&logoColor=white)](https://github.com/ongunakaycom/ibm-developer-skills-network-wtecc-CICD_Practice/blob/main/Dockerfile)
[![Tekton](https://img.shields.io/badge/Tekton-Pipelines-FD495C?logo=tekton&logoColor=white)](https://tekton.dev/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Orchestration-326CE5?logo=kubernetes&logoColor=white)](https://kubernetes.io/)
[![Python](https://img.shields.io/badge/Python-3.9-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](./LICENSE)

A production-grade Python (Flask) application demonstrating modern containerization, automated CI with GitHub Actions, and cloud-native continuous deployment using **Tekton Pipelines** on **Kubernetes**. 

This repository serves as a comprehensive hands-on lab for Platform Engineering and DevOps practices.

## 🏛️ Architecture & Workflow

```text
[ Developer Push to main ]
           │
           ▼
[ GitHub Actions (CI) ]
   ├─► Python 3.9 environment setup
   ├─► Dependency install (pip)
   ├─► Code Linting (flake8)
   ├─► Unit Testing & Coverage (pytest)
   └─► CI Pass / Fail Status
           │
           ▼
[ Containerization ]
   ├─► Multi-stage Docker build
   ├─► Non-root user execution (hardened)
   └─► Gunicorn WSGI server (port 8000)
           │
           ▼
[ Kubernetes Cluster ]
   └─► Tekton CD Pipelines
        ├─► Task: Git Clone (Checkout)
        ├─► Task: Lint & Test (Quality Gates)
        ├─► Task: Build Container Image
        └─► Task: Deploy to K8s Environment
```

## 🛠️ Tech Stack & Engineering Decisions

| Layer | Technology | Engineering Decision |
|-------|-----------|---------------------|
| **Application** | Python / Flask | Lightweight, scalable REST API. |
| **Testing** | Pytest & Flake8 | Automated quality gates and linting for reliable code. |
| **CI (Integration)** | GitHub Actions | Automated tests on every PR and push to `main`. |
| **Container** | Docker (Multi-stage) | Optimized for size; runs as a non-root user (Security). |
| **Runtime** | Gunicorn | Production-grade WSGI server (not Flask dev server). |
| **CD (Deployment)**| Tekton Pipelines | Cloud-native, Kubernetes-native CI/CD execution. |
| **Orchestration** | Kubernetes | Auto-scaling, self-healing container orchestration. |

## 🗂️ Repository Structure

```text
.
├── .github/workflows/workflow.yml # CI: Test, Lint, Coverage
├── labs/                          # Progressive DevOps Labs (Tekton)
│   ├── 01_base_pipeline/          # Tekton Tasks & Pipeline definitions
│   ├── 02_add_git_trigger/        # EventListeners & Webhooks
│   └── ... (03 to 06)
├── service/                       # Core Application Logic
│   ├── common/                    # Error handling, Logging, Status
│   └── routes.py                  # API Endpoints
├── tests/                         # Unit tests (test_routes.py)
├── Dockerfile                     # Hardened multi-stage build
├── requirements.txt               # Pinned dependencies
└── README.md
```

## 🚀 Local Development & Testing

**1. Setup Virtual Environment:**
```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

**2. Run Linter and Tests:**
```bash
flake8 service
pytest tests/ -v --cov=service
```

**3. Run Locally:**
```bash
flask run
# → http://localhost:5000
```

## 🐳 Containerization & Deployment

**Build the hardened image:**
```bash
docker build -t cicd-practice:v1 .
```

**Run the container (Mapping port 5000 to Gunicorn's 8000):**
```bash
docker run -d -p 5000:8000 --name app cicd-practice:v1
# → Test at http://localhost:5000
```

## ☁️ Tekton CD Pipelines (Cloud-Native)

The `labs/` directory contains progressive Tekton implementations. To deploy the base pipeline to your Kubernetes cluster:

```bash
# Apply Tasks and Pipelines
kubectl apply -f labs/01_base_pipeline/tasks.yaml
kubectl apply -f labs/01_base_pipeline/pipeline.yaml

# Trigger the pipeline manually
kubectl create -f - <<EOF
apiVersion: tekton.dev/v1beta1
kind: PipelineRun
metadata:
  generateName: cd-pipeline-run-
spec:
  pipelineRef:
    name: cd-pipeline
  params:
    - name: repo-url
      value: "https://github.com/ongunakaycom/ibm-developer-skills-network-wtecc-CICD_Practice.git"
EOF
```

## 🔐 Security & Best Practices

- **Non-root Container:** Dockerfile creates a dedicated `service` user to prevent root escalation.
- **Dependency Pinning:** `requirements.txt` uses strict versioning for reproducible builds.
- **Quality Gates:** Pipeline fails if `flake8` detects syntax errors or `pytest` fails.
- **Clean Git History:** `.gitignore` strictly blocks IDE settings and temporary CLI downloads.

## 👤 Author

**Ongun Akay** — Senior Full-Stack & DevOps Engineer

🌐 [ongunakay.com](https://ongunakay.com) · 💼 [LinkedIn](https://linkedin.com/in/ongunakay) · 🧑‍💻 [GitHub](https://github.com/ongunakaycom)

## 📄 License

This project is licensed under the Apache-2.0 License — see the [LICENSE](./LICENSE) file for details.