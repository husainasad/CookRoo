## Steps to deploy on Cloud

### VPC
- Create a VPC
    - My VPC CIDR block (10.0.0.0/24)
- Create atleast one private subnet and atleast two public subnets (atleast one public subnet in each private subnet region)
    - My private subnet CIDR block (10.0.0.0/28)
    - My public subnet 1 CIDR block (10.0.0.16/28) [in same region as private subnet]
    - My public subnet 2 CIDR block (10.0.0.32/28)
- Each public subnet to have 8 or more available IPs (required in ALB)
- Create Internet gateway for public subnet route table
- Route tables 
    - Only VPC destination for private subnet
    - VPC destination and 0.0.0.0.0 destination with internet gateway target for public subnets
    - Verify the routing in VPC resource map

### RDS
- Create RDS in the VPC private subnet
- Security Group settings:
    - Inbound TCP 5432 Source (EC2 SG)
    - Outbound All Traffic Anywhere

### EC2
- Create EC2 in the VPC private subnet
- Security Group settings:
    - Inbound TCP 8000 Source (ALB SG) [The backend server listens on port 8000]
    - Inbound SSH 22 Source (Bastion SG) [Bastion is used to set up the application server]
    - Outbound All Traffic Anywhere
- SSH via Bastion
    - Create an ec2 instance with public IP
    - Security Group settings:
        - Inbound TCP 22 Source (Anywhere)
        - Outbound All Traffic Anywhere
    - SSH into Bastion
    - Copy the pem file from local system into bastion ```pscp -i {bastion.pem} {server.pem} ubuntu@server_IP:/home/ubuntu/```
    - SSH into server from bastion
    - Update ```sudo apt-get update -y```
    - Check Postgres connection:
        - ```sudo apt-get install postgresql-client -y```
        - ```psql -h <rds-endpoint> -U <master-username> -d <database-name>```
- Application set up (manual using bastion):
    ```
    sudo apt install python3.12-venv -y
    python3 -m venv projectenv
    source projectenv/bin/activate
    git clone -q https://github.com/husainasad/CookRoo.git
    cd CookRoo/cookroo_backend/
    pip install --upgrade pip
    pip install -r requirements.txt
    python manage.py test --parallel
    python manage.py makemigrations
    python manage.py migrate
    python manage.py runserver 0.0.0.0:8000
    ```
- Systemd script:
    - sudo nano /etc/systemd/system/cookroo.service
    ```
    [Unit]
    Description=Cookroo Backend Application Service
    After=multi-user.target
    StartLimitIntervalSec=0

    [Service]
    Type=simple
    User=ubuntu
    WorkingDirectory=/home/ubuntu/CookRoo/cookroo_backend
    ExecStart=/home/ubuntu/projectenv/bin/python manage.py runserver 0.0.0.0:8000
    Restart=always
    RestartSec=1

    [Install]
    WantedBy=multi-user.target
    ```
- Validate service:
    - sudo systemctl daemon-reload
    - sudo systemctl enable cookroo.service
    - sudo systemctl start cookroo.service
    - sudo systemctl status cookroo.service
    - sudo journalctl -u cookroo.service
    - sudo journalctl -u cookroo.service --since "10 minutes ago"

- Automatic application set up script:
    ```
    #!/bin/bash
    sudo -u ubuntu -i <<'EOF'
    sudo apt-get update -y
    sudo apt install python3.12-venv -y
    python3 -m venv projectenv
    source projectenv/bin/activate
    git clone -q https://github.com/husainasad/CookRoo.git
    pip install --upgrade pip
    pip install -r /home/ubuntu/CookRoo/cookroo_backend/requirements.txt

    echo "#!/bin/bash
    source /home/ubuntu/projectenv/bin/activate
    cd /home/ubuntu/CookRoo/cookroo_backend
    python manage.py makemigrations
    python manage.py migrate
    python manage.py runserver 0.0.0.0:8000
    " | sudo tee /home/ubuntu/setup_cookroo.sh

    sudo chmod +x /home/ubuntu/setup_cookroo.sh

    echo "[Unit]
    Description=Cookroo Backend Application Service
    After=multi-user.target
    StartLimitIntervalSec=0

    [Service]
    Type=simple
    User=ubuntu
    WorkingDirectory=/home/ubuntu/CookRoo/cookroo_backend
    ExecStart=/home/ubuntu/start_cookroo.sh
    Restart=always
    RestartSec=1

    [Install]
    WantedBy=multi-user.target" | sudo tee /etc/systemd/system/cookroo.service

    sudo chmod 644 /etc/systemd/system/cookroo.service
    sudo systemctl start cookroo.service
    sudo systemctl enable cookroo.service
    
    EOF
    ```

### ALB
- Create a Target Group
    - Type instance
    - Select the VPC
    - Modify Health Check path to any API handling GET request
    - Register the EC2 instance at port 8000
- Create an ALB
    - Select the VPC
    - Select at least two AZs and one subnet per zone (Select the public subnets which are in same zones as private subnets)
    - Select the previously created target zone
    - Security Group settings:
    - Inbound TCP 80 Source All
    - Outbound All Traffic Anywhere
- Test if API get request by browser is going through

### S3
- Create an S3 bucket
- Build frontend locally by replacing the API.js API with the ALB DNS
- Copy the files inside build folder to S3
- Enable static website hosting
- Set default page as 'index.html'
- Update bucket policy as:
    ```
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "Statement1",
                "Effect": "Allow",
                "Principal": "*",
                "Action": "s3:GetObject",
                "Resource": "arn:aws:s3:::cookroo-frontend/*"
            }
        ]
    }
    ```
- Test application by navigating to Bucket website endpoint (visible in bucket properties)

### CloudFront
- Create CDN Distribution
- Use the S3 bucket URL in Origin domain
- Select No security if asked
- Test CDN by navigating to Distribution domain name (use http:// instead of default https:// or else install certficate on ALB)