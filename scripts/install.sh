cd ..
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get update

sudo apt-get install -y mongodb-org
sudo systemctl start mongod

sudo apt-get install nodejs-legacy

sudo apt-get install npm
npm config set registry="http://registry.npmjs.org/"
sudo npm cache clean -f

sudo npm install n -g
sudo n stable

sudo npm cache clean -f
sudo npm install pm2 -g

cd quizteam-app
npm install
cd ..
cd quizteam-backend
npm install
