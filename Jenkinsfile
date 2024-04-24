pipeline {
    agent any

    stages {

        stage('test'){
            steps{
                echo 'testing'
            }
        }

        stage('node-test'){
            steps{
                nodejs(nodeJSInstallationName: 'Node 6.x', configId: '<config-file-provider-id>')
                sh 'npm install'
                sh 'npm run test'
            }
        }
    }
}