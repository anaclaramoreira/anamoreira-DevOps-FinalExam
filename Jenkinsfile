pipeline {
    agent { label 'dynamic' }

    stages {
        stage('Deploy to Production Env 1') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'ssh-key-id', keyFileVariable: 'SSH_KEY')]) {
                    script {
                        def PROD_SERVER_1 = "98.93.44.74"

                        sh """
                        ssh -o StrictHostKeyChecking=no -i \${SSH_KEY} ec2-user@\${PROD_SERVER_1} '
                            echo "--- Connected to Server 1 ---"
                            
                            sudo dnf update -y
                            sudo dnf install -y httpd git
                            
                            sudo systemctl start httpd
                            sudo systemctl enable httpd
                            
                            sudo rm -rf /var/www/html/*
                            
                            sudo git clone https://github.com/anaclaramoreira/anamoreira-DevOps-FinalExam.git /var/www/html
                            
                            echo "--- Deploy to Server 1 finished ---"
                        '
                        """
                    }
                }
            }
        }
        
        stage('Deploy to Production Env 2') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'ssh-key-id', keyFileVariable: 'SSH_KEY')]) {
                    script {
                        def PROD_SERVER_2 = "3.92.58.10"
                        
                        sh """
                        ssh -o StrictHostKeyChecking=no -i \${SSH_KEY} ec2-user@\${PROD_SERVER_2} '
                            echo "--- Connected to Server 2 ---"
                            
                            sudo dnf update -y
                            sudo dnf install -y httpd git
                            
                            sudo systemctl start httpd
                            sudo systemctl enable httpd
                            
                            sudo rm -rf /var/www/html/*
                            sudo git clone https://github.com/anaclaramoreira/anamoreira-DevOps-FinalExam.git /var/www/html
                            
                            echo "--- Deploy to Server 2 finished ---"
                        '
                        """
                    }
                }
            }
        }
    }
}
