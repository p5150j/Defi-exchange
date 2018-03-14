include .env.docker

build: down
	@docker-compose rm -f
	@docker-compose build

up:
	@docker-compose run --rm start_dependencies
	@docker-compose up -d backend frontend

down:
	@docker-compose stop

seed:
	@docker exec -i db mysql -uroot -p"${MYSQL_ROOT_PASSWORD}" ${MYSQL_DATABASE} < ./backend/data/dbdump.sql
	@echo "Done. "
