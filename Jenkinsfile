pipeline {
  agent any
    
  tools {nodejs "nodejs"}
    
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