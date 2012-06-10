default:
	node-waf configure
	@echo 
	node-waf clean
	@echo 
	node-waf build
	@echo 
	node test.js
