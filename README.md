# Project Name: Node.js Web Application with MongoDB and Redis

## Overview

This project involves the deployment of a sample web application in a containerized environment using Docker and Kubernetes. The application is built using Node.js and MongoDB for data storage, with Redis being used as a caching service. Two endpoints have been implemented: one for saving user information (username and IP) to MongoDB, and another for retrieving the list of users and their IPs.
Notably, a Jenkins CI/CD pipeline has been integrated for streamlined development and deployment on Amazon EKS.

### Prerequisites

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Kubernetes](https://kubernetes.io/)
- [Helm](https://helm.sh/)
- [Amazon EKS](https://aws.amazon.com/eks/)
- [eksctl](https://eksctl.io/)
- [Docker Hub Account](https://hub.docker.com/)


### Assumptions

- I assume that you have a basic understanding of Nodejs, Docker, Kubernetes, Helm, jenkins and Amazon EKS.

### Steps

1. **Clone the Repository**

    ```bash
    git clone https://github.com/AbdelrhmanAli123/microservices-devops-task.git
    cd your-repository
    ```

2. **Build and Push Docker Image to Docker Hub**

   ```bash
   # Login to Docker Hub
   docker login -u your-dockerhub-username -p your-dockerhub-password

   # Build the Docker image
   docker build -t your-dockerhub-username/your-image-name:tag .

   # Push the Docker image to Docker Hub
   docker push your-dockerhub-username/your-image-name:tag
   

3. **Run Docker Containers using Docker Compose for Testing**

    ```bash
    docker-compose up -d  
    ```
    
    ##### note: I used Docker Compose for local testing to ensure the correct functioning of application components.
   

5. **Test the Components Locally**

   - Open a web browser and navigate to `http://localhost:your-port` to access the application.
   - Use tools like Postman to test the implemented endpoints locally.
   - **EndPoints**
       - http://localhost:port/login  --> post method        # when hitting the endpoint for adding data to database you should use json and only pass this key {"userName": "your name"}
       - http://localhost:port/login  --> get method         # retrive the data stored in MongoDB


7. **Install jenkins, helm, kubectl and eksctl**
    ### install these tools on the node that you'll run the pipeline on

6. **Create Amazon EKS using eksctl**
    ```bash
    # it may take about 20 min
    eksctl create cluster --name my-eks-cluster --version you-cluster-version --region your-region
    ```
   #
   ##### note: if you can't ping the EKS cluster nodes, make sure the SG allow traffic
   #

8. **Instll the CSi driver for eks using eksctl to create EBS volume**
    ```bash
    # We have to do some steps before installing the CSI driver to allow the EKS to be authorized to provision EBS volume

    # variables used to create EKS
    export AWS_PROFILE="my-profile" # CHANGEME
    export EKS_CLUSTER_NAME="my-cluster" # CHANGEME
    export EKS_REGION="us-west-2"
    export EKS_VERSION="1.25"
        
    # variables used in automation
    export ROLE_NAME="${EKS_CLUSTER_NAME}_EBS_CSI_DriverRole"
    export ACCOUNT_ID=$(aws sts get-caller-identity \
      --query "Account" \
      --output text
    )
    export ACCOUNT_ROLE_ARN="arn:aws:iam::$ACCOUNT_ID:role/$ROLE_NAME"

    # Add OIDC Provider Support
    eksctl utils associate-iam-oidc-provider \
      --cluster $EKS_CLUSTER_NAME \
      --region $EKS_REGION \
      --approve

    # AWS managed policy for CSI driver SA to make EBS API calls
    POLICY_ARN="arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy"
    
    # AWS IAM role bound to a Kubernetes service account
    eksctl create iamserviceaccount \
      --name "ebs-csi-controller-sa" \
      --namespace "kube-system" \
      --cluster $EKS_CLUSTER_NAME \
      --region $EKS_REGION \
      --attach-policy-arn $POLICY_ARN \
      --role-only \
      --role-name $ROLE_NAME \
      --approve


    # Create Addon
    eksctl create addon \
      --name "aws-ebs-csi-driver" \
      --cluster $EKS_CLUSTER_NAME \
      --region=$EKS_REGION \
      --service-account-role-arn $ACCOUNT_ROLE_ARN \
      --force

    
    # Get status of the driver, must be STATUS=ACTIVE
    eksctl get addon \
      --name "aws-ebs-csi-driver" \
      --region $EKS_REGION \
      --cluster $EKS_CLUSTER_NAME

    
    # You can check on the running EBS CSI pods with the following command:
    kubectl get pods \
      --namespace "kube-system" \
      --selector "app.kubernetes.io/name=aws-ebs-csi-driver"

    # note: There is other way to install the CSI driver using HELM chart :)
     ```
    
9. **Create load balancer on aws to attach it with ingress controller**

   - create traget group and add the EKS instances and type the port used for ingress service
   - I specified 31111 port for the ingress service, so it's up to you to use the port you need in the accepted port range    
   - create the LB and add the traget group
    
10. **Extra Step SSL certificate**
    in case you have domain name you can import public certificate from AWS ACM service and attach the certificate to LB
    then create a CNAME record to make your domain name map to the LB URL
    
11. **Deploy the APP using jenkins**
    - store the aws, dockerhub and github credential in your Jenkins server
    - run the pipeline ya m3lm using the Jenkins file provided in this repo
        
12. **Access the Application**

    Once deployed, access the application at `http://your-loadbalancer-url`.



## Evaluation Criteria

This project will be evaluated based on the provided design diagram, Docker files, CI/CD configuration, Helm chart, Kubernetes manifests, and the completeness of the README file. Additionally, the clarity of assumptions, prioritization, and testing summaries will be considered during evaluation.
