#!/bin/bash
# If the Git repository URL is not provided, use the default app
#set -x
if [ "$#" -lt 2 ] || [ "$#" -gt 3 ]; then
  echo "Usage: $0 <target_environment> <app_name> [git_repo_url]"
  exit 1
fi
# Parse arguments
TARGET_ENVIRONMENT=$1
APP_NAME=$2
GIT_REPO_URL=$3

# Check if TARGET_ENVIRONMENT is valid
if [ "$TARGET_ENVIRONMENT" != "dev" ] && [ "$TARGET_ENVIRONMENT" != "prod" ]; then
  echo "TARGET_ENVIRONMENT must be either 'dev' or 'prod'"
  exit 1
fi


# Check if arguments 1 and 2 are the Git URL
if echo "$TARGET_ENVIRONMENT" | grep -Eq '(http|https)://' || echo "$TARGET_ENVIRONMENT" | grep -Eq '\.git$'; then
  echo "The <target_environment> argument cannot be a Git URL."
  exit 1
fi

if echo "$APP_NAME" | grep -Eq '(http|https)://' || echo "$APP_NAME" | grep -Eq '\.git$'; then
  echo "The <app_name> argument cannot be a Git URL."
  exit 1
fi

echo "TARGET_ENVIRONMENT: $TARGET_ENVIRONMENT"
echo "APP_NAME: $APP_NAME"
echo "GIT_REPO_URL: $GIT_REPO_URL"

# Update the Ubuntu VM instance
sudo apt update -y
sudo apt upgrade -y


if ! command -v git &> /dev/null; then
    echo "Git not found. Installing Git..."
    sudo apt-get update
    sudo apt-get install -y git
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    # Install npm and create-react-app
    curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
    sudo apt -y install nodejs
    node  -v
fi

# Check if npm is installed
if ! command -v create-react-app &> /dev/null; then
    echo "create-react-app  not found. Installing create-react-app..."
    sudo npm install -g npm@latest
    sudo npm install -g create-react-app
fi

# Create or Clone React app
if [ -d /var/www/ ]; then
    echo "The /var/www/ directory already exists."
else
    echo "The /var/www/ directory does not exist. Creating it..."
    sudo mkdir  -p /var/www
    cd /var/www/ || exit 1
    sudo gpasswd -a "$USER" www-data
    sudo chown -R "$USER":www-data /var/www
    find /var/www -type f -exec chmod 0660 {} \;
    sudo find /var/www -type d -exec chmod 2770 {} \;
fi


# Delete existing app directory if it exists
if [ -d "/var/www/$APP_NAME" ]; then
  read -p "The $APP_NAME directory already exists. Do you want to delete it? (y/n) " confirm
  if [[ "$confirm" =~ ^[Yy]$ ]]; then
    sudo rm -rf "/var/www/$APP_NAME"
    echo "Deleted $APP_NAME."
    echo "Please run this script again to create the app."
    exit 1
  else
    echo "Aborting."
    exit 1
  fi
fi

# Build React app
# If the Git repository URL is not provided, use the default app
if [ -z "$GIT_REPO_URL" ]; then
  echo "No Git repository URL provided. Using default app: $APP_NAME"
  cd /var/www/ || exit 1
  create-react-app "${APP_NAME}" # or git clone [URL of App Repository]
  cd /var/www/"${APP_NAME}" || exit 1
else
  echo "Cloning Git repository: $GIT_REPO_URL"
  git clone "$GIT_REPO_URL" "$APP_NAME"
  mv "$APP_NAME"/ /var/www/
  cd /var/www/"${APP_NAME}" || exit 1
fi



sudo npm install
sudo npm run build

# Start development or production server
if [ "$TARGET_ENVIRONMENT" == "dev" ]; then
  sudo npm start
else
  sudo npm install -g serve
  sudo serve -s build
fi