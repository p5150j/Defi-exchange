DC="docker-compose"

build:
	@${DC} rm -f
	@${DC} build

up:
	@${DC} up
