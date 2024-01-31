dropdb --if-exists moshimusukwadev
psql -d postgres -c "DROP USER IF EXISTS moshimusukwadev_app"
createdb moshimusukwadev
psql -d moshimusukwadev -c "ALTER DATABASE moshimusukwadev SET TIMEZONE TO 'Etc/UTC';"
psql -d moshimusukwadev -c "CREATE USER moshimusukwadev_app WITH PASSWORD 'greenbullsucks@2023';"
psql -d moshimusukwadev -c "GRANT ALL PRIVILEGES ON DATABASE moshimusukwadev TO moshimusukwadev_app;"
psql -d moshimusukwadev -c "ALTER USER moshimusukwadev_app WITH SUPERUSER"
