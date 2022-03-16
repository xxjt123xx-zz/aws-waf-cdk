pipeline {
  agent any
    
  tools {nodejs "nodejs"}

  environment {
    ACCOUNT = "358068194925"
    REGION = "us-west-1"
  }
    
  stages {
     
    stage('NPM Install') {
      steps {
        sh 'npm i'
      }
    } 
     
    stage('Deploy') {
      steps {
        sh 'npm start'
      }
    }  
  }
}