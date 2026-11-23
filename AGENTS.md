# Working in this repository

- Run `docker compose up` from the repository root and open `http://localhost:5001`. Add or edit Markdown in `content/writings/` or `content/notes/` while it runs.
- Use Docker Compose for development and verification. Run `make lint` and `make generate` with the container running. Run `make build` after dependency changes.
- Keep code concise. Reuse existing code and document only what the code cannot explain.
- Keep deployment details and credentials out of tracked files.
