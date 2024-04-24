pipeline {
    agent any

    stages {

        stage('test'){
            steps{
                echo 'testing'
            }
        }

        stage('node-test'){
            agent node:latest
            steps{
                sh 'npm install'
                sh 'npm run test'
            }
        }
    }
}