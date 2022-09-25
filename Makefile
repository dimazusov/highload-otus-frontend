build:
	 echo "var apiConfig = {\"host\":\"$API_HOST\", "port":\"$API_PORT\"}" > src/config.js && npm run build