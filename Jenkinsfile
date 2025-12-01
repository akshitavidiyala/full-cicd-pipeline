pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "your-docker-username/full-cicd-demo:latest"
    }

    stages {
        stage('Checkout') {
            steps {
                // Gets code from the same Git repo where Jenkinsfile lives
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker image') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE} ."
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-cred',
                                                 usernameVariable: 'DOCKER_USER',
                                                 passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                      echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                      docker push ${DOCKER_IMAGE}
                      docker logout
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                // Assumes kubectl is already configured on Jenkins machine
                sh '''
                  kubectl apply -f k8s/deployment.yaml
                  kubectl apply -f k8s/service.yaml
                  kubectl rollout status deployment/full-cicd-demo
                '''
            }
        }
    }
}

