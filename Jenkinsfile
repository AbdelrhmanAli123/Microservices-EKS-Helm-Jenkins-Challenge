pipeline {
  agent any

  environment {
    GIT_REPO = 'https://github.com/AbdelrhmanAli123/microservices-devops-task.git'
    GIT_BRANCH = 'main'
    SCANNER_HOME = tool 'sonarqube';  
    IMAGE_NAME = 'abdelrhmandevops/microservices-task'
    
  }

    stages {
        stage("Code Checkout from Github") {
          steps {
            git credentialsId:'github_cred', url: '${GIT_REPO}', branch: '${GIT_BRANCH}'
          }
      }
        // ----------------------------------------------------
        // this for code quelity but we don't need it here 
        // ----------------------------------------------------
        // stage('SonarQube analysis') {
        //     steps {
        //         script {
        //             def scannerHome = tool 'sonarqube'     // sonarqube global tool
        //             withSonarQubeEnv('sonarqube') {        // and this is the sonarqube scanner that we passed the token in to authenticate jenkins into sonarqube server 
        //                 sh """
        //                     ${scannerHome}/bin/sonar-scanner \
        //                     -Dsonar.projectKey=micro-task \
        //                     -Dsonar.projectName=micro-task \
        //                     -Dsonar.projectVersion=1.0 \
        //                     -Dsonar.sources=src/
        //                 """
        //             }
        //         }
        //     }
        // }
        
        stage('Build Docker Image and push it to DockerHub') {
            steps {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub_cred', passwordVariable: 'password', usernameVariable: 'username')]) {
                sh """ 
                    docker build . -t  ${IMAGE_NAME}:${BUILD_NUMBER}
                    docker login -u ${username} -p ${password}
                    docker push ${IMAGE_NAME}:${BUILD_NUMBER}
                    """
                } 
            }
        }
        stage('deploy the nodejs via helm'){
            steps{
                script {
                    withCredentials([[
                        $class: 'AmazonWebServicesCredentialsBinding', 
                        accessKeyVariable: 'AWS_ACCESS_KEY_ID', 
                        secretKeyVariable: 'AWS_SECRET_ACCESS_KEY',
                        credentialsId: 'aws_cred'
                    ]]) {
                    sh "aws eks update-kubeconfig --region us-east-2 --name my-eks"
                    sh "helm upgrade --install --force micro-app ./helm_chart --set appimage=${IMAGE_NAME}:${BUILD_NUMBER}"  
                    sh "Docker rmi --force appimage=${IMAGE_NAME}:${BUILD_NUMBER} || true " // it's not mendatory step but i don't have much storage
                    }
                }
            }
        }
    }
}




