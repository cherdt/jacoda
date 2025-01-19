dev:
	@echo "Copying to local web server..."
	cp index.html /var/www/html/jacoda/
	cp jacoda.js /var/www/html/jacoda/

prod:
	@echo "Copying to production web server..."
	scp index.html osricwww:/var/www/osric.com/jacoda/
	scp jacoda.js osricwww:/var/www/osric.com/jacoda/

