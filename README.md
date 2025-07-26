# CI/CD Practice Project

This repository contains a comprehensive CI/CD practice project using Tekton pipelines and Kubernetes deployment strategies. The project demonstrates modern DevOps practices including automated testing, containerization, and progressive deployment techniques.

## Project Structure

```
├── .dockerignore
├── .flaskenv
├── .gitattributes
├── .github/
│   └── workflows/
│       └── workflow.yml
├── .gitignore
├── .vscode/
│   ├── launch.json
│   └── settings.json
├── Dockerfile
├── labs/
│   ├── 01_base_pipeline/
│   ├── 02_add_git_trigger/
│   ├── 03_use_tekton_catalog/
│   ├── 04_unit_test_automation/
│   ├── 05_build_an_image/
│   └── 06_deploy_to_kubernetes/
├── LICENSE
├── Procfile
├── README.md
├── requirements.txt
├── service/
│   ├── common/
│   └── routes.py
├── setup.cfg
└── tests/
    └── test_routes.py
```

## Overview

This project is part of the IBM Developer Skills Network and focuses on implementing CI/CD practices using modern tools and methodologies. It includes hands-on labs that progressively build complexity in the deployment pipeline.

## Technology Stack

- **Framework**: Flask (Python web framework)
- **Containerization**: Docker
- **CI/CD**: Tekton Pipelines
- **Orchestration**: Kubernetes
- **Version Control**: Git with GitHub Actions
- **Testing**: Python unittest framework

## Lab Progression

### Lab 01: Base Pipeline
- Introduction to basic Tekton pipeline concepts
- Setting up fundamental pipeline structure
- Understanding tasks and pipeline execution

### Lab 02: Add Git Trigger
- Implementing webhook-based triggers
- Event listeners and trigger bindings
- Automated pipeline execution on code changes

### Lab 03: Use Tekton Catalog
- Leveraging pre-built Tekton catalog tasks
- Implementing persistent volume claims (PVC)
- Optimizing pipeline efficiency with reusable components

### Lab 04: Unit Test Automation
- Integrating automated testing into the pipeline
- Test result reporting and failure handling
- Quality gates and continuous testing practices

### Lab 05: Build an Image
- Container image building within the pipeline
- Docker image optimization and security scanning
- Registry integration and image versioning

### Lab 06: Deploy to Kubernetes
- Kubernetes deployment automation
- Rolling updates and deployment strategies
- Service mesh integration and monitoring

## Application Structure

### Service Layer
The `service/` directory contains the core application logic:
- `routes.py`: API endpoint definitions and request handling
- `common/`: Shared utilities and common functionality
  - `error_handlers.py`: Centralized error handling
  - `log_handlers.py`: Logging configuration and utilities
  - `status.py`: Application status and health check endpoints

### Testing
- `tests/test_routes.py`: Comprehensive unit tests for API endpoints
- Automated test execution in CI/CD pipeline
- Coverage reporting and quality metrics

## Getting Started

### Prerequisites
- Docker installed and configured
- Kubernetes cluster access
- Tekton Pipelines installed on the cluster
- Python 3.8+ for local development

### Local Development
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ibm-developer-skills-network-wtecc-CICD_Practice
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the application locally:
   ```bash
   flask run
   ```

### Docker Development
1. Build the Docker image:
   ```bash
   docker build -t cicd-practice .
   ```

2. Run the containerized application:
   ```bash
   docker run -p 5000:5000 cicd-practice
   ```

## Pipeline Execution

Each lab contains specific instructions for deploying and executing the Tekton pipelines. The general workflow includes:

1. Apply the pipeline and task definitions to your Kubernetes cluster
2. Configure the necessary secrets and service accounts
3. Trigger the pipeline either manually or through webhook events
4. Monitor pipeline execution through the Tekton dashboard

## Configuration Files

- **Dockerfile**: Multi-stage build configuration for optimal image size
- **.dockerignore**: Excludes unnecessary files from Docker build context
- **Procfile**: Heroku deployment configuration
- **setup.cfg**: Python project configuration and testing parameters
- **.flaskenv**: Flask-specific environment variables

## Contributing

This project follows standard Git workflow practices:
1. Fork the repository
2. Create a feature branch
3. Make changes and add tests
4. Ensure all tests pass
5. Submit a pull request

## GitHub Actions Integration

The `.github/workflows/workflow.yml` file contains automated CI/CD workflows that run on:
- Pull request creation and updates
- Pushes to main branch
- Scheduled maintenance tasks

## VS Code Configuration

The `.vscode/` directory contains development environment settings:
- `launch.json`: Debug configurations for the Flask application
- `settings.json`: Workspace-specific settings and extensions

## License

This project is licensed under the terms specified in the LICENSE file.

## Support and Documentation

For detailed lab instructions and troubleshooting, refer to the README.md files in each lab directory. Each lab provides step-by-step guidance for implementing specific CI/CD practices.

## Learning Objectives

By completing this project, you will gain hands-on experience with:
- Tekton pipeline design and implementation
- Kubernetes deployment strategies
- Container image optimization and security
- Automated testing integration
- GitOps and infrastructure as code practices
- Monitoring and observability in CI/CD pipelines

---

## 🤝 Contributing

Pull requests and feedback are welcome! If you'd like to contribute improvements, feel free to fork and submit a PR.

---

## About Me

I'm Ongun Akay, a Senior Full-Stack Developer with expertise across various technologies.

- 👀 I specialize in full-stack development with extensive experience in frontend and backend technologies.
- 🌱 Currently, I'm sharpening my skills in advanced concepts of web development.
- 💞️ I’m always open to exciting collaborations and projects that challenge my abilities.
- 📫 You can reach me at [info@ongunakay.com](mailto:info@ongunakay.com).

---

## 📄 License

This project is licensed under the [Apache-2.0 license](./LICENSE) — see the LICENSE file for details.