# Build container
build:
	docker-compose up --build --detach

# Destroy container
destroy:
	docker-compose down --volumes

# Lint check application
lint:
	docker-compose exec app npm run lint

# Start containers
start:
	docker-compose up --detach

# Stop containers
stop:
	docker-compose stop

# Access container shell
shell:
	docker-compose exec app bash

# Check container logs
logs:
	docker-compose logs --follow app

# Static Generate site
generate:
	docker-compose exec app npm run generate