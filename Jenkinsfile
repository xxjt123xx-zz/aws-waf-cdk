def awsCredentials = [[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-personal']]


pipeline {
  agent any
    
  tools {nodejs "nodejs"}

  options {
    disableConcurrentBuilds()
    parallelsAlwaysFailFast()
    timestamps()
    withCredentials(awsCredentials)
  }

  stages {
     
    stage('NPM Install') {
      steps {
        sh 'npm i'
      }
    } 
     
    stage('Deploy - us-west-1') {

      environment {
        ACCOUNT = '358068194925'
        REGION = 'us-west-1'
        APP_NAME = 'web-acl-test'
      }

      steps {
        sh 'npm start'
      }
    }  
     
    stage('Deploy - us-east-1') {

      environment {
        ACCOUNT = '358068194925'
        REGION = 'us-east-1'
        APP_NAME = 'web-acl-test'
      }
      
      steps {
        sh 'npm start'
      }
    } 
  }
}