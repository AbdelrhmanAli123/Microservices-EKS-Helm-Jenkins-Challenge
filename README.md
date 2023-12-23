# Project Name: Node.js Web Application with MongoDB and Redis

## Overview

This project involves the deployment of a sample web application in a containerized environment using Docker and Kubernetes. The application is built using Node.js and MongoDB for data storage, with Redis being used as a caching service. Two endpoints have been implemented: one for saving user information (username and IP) to MongoDB, and another for retrieving the list of users and their IPs.

## Components

1. **Node.js Backend**: Responsible for handling HTTP requests and interacting with the database.

2. **MongoDB Database**: Stores user information (username and IP).

3. **Redis Cache**: Used to cache data and improve performance.

## Deployment

### Prerequisites

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- [Kubernetes](https://kubernetes.io/)
- [Helm](https://helm.sh/)

### Steps

1. **Clone the Repository**

    ```bash
    git clone https://github.com/your-username/your-repository.git
    cd your-repository
    ```

2. **Build Docker Images**

    ```bash
    docker-compose build
    ```

3. **Run Docker Containers**

    ```bash
    docker-compose up -d
    ```

4. **Deploy to Kubernetes using Helm**

    ```bash
    helm install my-app ./charts/my-app
    ```

5. **Access the Application**

    Once deployed, access the application at `http://your-app-url`.

## Assumptions and Prioritization

### Assumptions

- Assumes Docker, Node.js, MongoDB, Redis, Kubernetes, and Helm are already installed.
- Assumes a basic understanding of Docker, Kubernetes, and Helm.

### Prioritization

- Prioritized setting up a functional application with the specified components.
- Focused on Dockerizing the application and creating Helm charts for easy Kubernetes deployment.
- Assumed a local development environment for simplicity.

## Testing

### Testing Process

- Unit tests were conducted for individual components.
- Integration tests ensured proper communication between Node.js, MongoDB, and Redis.
- Endpoints were tested using tools like Postman.

### Issues Encountered

- Encounter issue with data consistency between MongoDB and Redis in certain scenarios.
- Resolved by implementing a caching strategy and updating the cache accordingly.

## Evaluation Criteria

This project will be evaluated based on the provided design diagram, Docker files, CI/CD configuration, Helm chart, Kubernetes manifests, and the completeness of the README file. Additionally, the clarity of assumptions, prioritization, and testing summaries will be considered during evaluation.
