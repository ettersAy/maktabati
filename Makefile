# Makefile for Maktabati documentation site
# Supports common development tasks with intelligent checks

.PHONY: help install dev build preview test e2e e2e-ui e2e-report clean

help:
	@echo "Maktabati Makefile Commands"
	@echo "=============================="
	@echo "make install      - Install dependencies"
	@echo "make dev          - Start dev server"
	@echo "make build        - Build for production"
	@echo "make preview      - Preview production build"
	@echo "make e2e          - Run E2E tests (auto-starts server if needed)"
	@echo "make e2e-ui       - Run E2E tests in UI mode"
	@echo "make e2e-report   - Show E2E test report"
	@echo "make test         - Run all tests"
	@echo "make clean        - Clean build artifacts"
	@echo ""
	@echo "Advanced:"
	@echo "make server-check - Check if preview server is running"

install:
	npm ci

dev:
	npm run docs:dev

build:
	npm run docs:build

preview:
	npm run docs:preview

server-check:
	@echo "Checking if preview server is running on http://localhost:4173..."
	@if curl -sf http://localhost:4173/maktabati/ > /dev/null 2>&1; then \
		echo "✓ Server is running"; \
		exit 0; \
	else \
		echo "✗ Server not running on port 4173"; \
		exit 1; \
	fi

# Run tests with intelligent server management
test: e2e

e2e:
	@echo "Running E2E tests with fail-fast..."
	@if make server-check > /dev/null 2>&1; then \
		echo "✓ Using existing server"; \
		npx playwright test --max-failures=1; \
	else \
		echo "⚠ Server not running. Building and starting preview server..."; \
		npm run docs:build && \
		echo "Starting preview server in background..."; \
		npm run docs:preview > /tmp/preview.log 2>&1 & \
		PREVIEW_PID=$$!; \
		echo "Waiting 3 seconds for server to start..."; \
		sleep 3; \
		if make server-check > /dev/null 2>&1; then \
			echo "✓ Server started, running tests..."; \
			npx playwright test --max-failures=1; \
			TEST_RESULT=$$?; \
			kill $$PREVIEW_PID 2>/dev/null || true; \
			exit $$TEST_RESULT; \
		else \
			echo "✗ Failed to start server"; \
			kill $$PREVIEW_PID 2>/dev/null || true; \
			cat /tmp/preview.log; \
			exit 1; \
		fi; \
	fi

e2e-ui:
	@echo "Running E2E tests in UI mode..."
	@if make server-check > /dev/null 2>&1; then \
		echo "✓ Using existing server"; \
		npx playwright test --ui; \
	else \
		echo "⚠ Server not running. Starting preview server..."; \
		npm run docs:build && npm run docs:preview &\
		sleep 3; \
		npx playwright test --ui; \
	fi

e2e-f:
	@echo "Running full E2E test suite..."
	@if make server-check > /dev/null 2>&1; then \
		echo "✓ Using existing server"; \
		npx playwright test; \
	else \
		echo "⚠ Server not running. Building and starting preview server..."; \
		npm run docs:build && \
		echo "Starting preview server in background..."; \
		npm run docs:preview > /tmp/preview.log 2>&1 & \
		PREVIEW_PID=$$!; \
		echo "Waiting 3 seconds for server to start..."; \
		sleep 3; \
		if make server-check > /dev/null 2>&1; then \
			echo "✓ Server started, running tests..."; \
			npx playwright test; \
			TEST_RESULT=$$?; \
			kill $$PREVIEW_PID 2>/dev/null || true; \
			exit $$TEST_RESULT; \
		else \
			echo "✗ Failed to start server"; \
			kill $$PREVIEW_PID 2>/dev/null || true; \
			cat /tmp/preview.log; \
			exit 1; \
		fi; \
	fi

e2e-report:
	npx playwright show-report

clean:
	rm -rf node_modules docs/.vitepress/dist
