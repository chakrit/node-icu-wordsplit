default:
	@echo 
	node-waf configure
	@echo 
	node-waf build
	@echo 
	node test.js
