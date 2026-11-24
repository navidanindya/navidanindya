.PHONY: build destroy lint start stop shell logs generate

build:
	docker compose up --build --detach --renew-anon-volumes

destroy:
	docker compose down --volumes

lint:
	docker compose exec app npm run lint

start:
	docker compose up --detach

stop:
	docker compose stop

shell:
	docker compose exec app bash

logs:
	docker compose logs --follow app

generate:
	docker compose exec app npm run generate
