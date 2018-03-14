DC="docker-compose"
include .env.docker

build: down
	@${DC} rm -f
	@${DC} build

up:
	@${DC} up -d

down:
	@${DC} stop

seed:
	@docker exec -i db mysql -uroot -p"${MYSQL_ROOT_PASSWORD}" ${MYSQL_DATABASE} < ./backend/data/dbdump.sql
	@echo "Done. "
