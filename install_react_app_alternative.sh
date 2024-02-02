# react app deploy using nginx
sudo apt install npm
npm install -g npm@latest
sudo mkdir /var/www
cd /var/www/
sudo gpasswd -a "$USER" www-data
sudo chown -R "$USER":www-data /var/www
find /var/www -type f -exec chmod 0660 {} \;
sudo find /var/www -type d -exec chmod 2770 {} \;

git clone ai-app
cd /var/www/ai-app
sudo npm install
sudo npm run build

sudo apt install nginx

cd /etc/nginx/sites-enabled/
rm default

cd /etc/nginx/sites-available/
rm default
git clone nginx-config

cd /etc/nginx/sites-available/
sudo ln -s default /etc/nginx/sites-enabled/.

#sudo nginx -t
sudo ufw allow 'Nginx Full'
sudo systemctl daemon-reload

sudo systemctl start nginx
sudo systemctl restart nginx

sudo npm run start

