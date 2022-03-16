def awsCredentials = [[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'jthornes']]


pipeline {
  agent any
    
  tools {nodejs "nodejs"}

  environment {
    ACCOUNT = "358068194925"
    REGION = "us-west-1"
  }

  options {
    disableConcurrentBuilds()
    parallelsAlwaysFailFast()
    timestamps()
    withCredentials(awsCredentials)
  }

  stages {

    stage('Echo EnvVars') {
        steps {
            echo "${env.ACCOUNT}"
            echo "${env.REGION}"
        }
    }

     
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