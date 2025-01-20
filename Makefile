dev:
	@echo "Copying to local web server..."
	cp index.html /var/www/html/jacoda/
	cp jacoda.js /var/www/html/jacoda/
	cp jacoda.css /var/www/html/jacoda/
	cp test.html /var/www/html/jacoda/
	cp movies.jacoda.js /var/www/html/jacoda/
	cp movies.json.js /var/www/html/jacoda/


prod:
	@echo "Copying to production web server..."
	scp index.html osricwww:/var/www/osric.com/jacoda/
	scp jacoda.js osricwww:/var/www/osric.com/jacoda/
	scp jacoda.css osricwww:/var/www/osric.com/jacoda/
	scp test.html osricwww:/var/www/osric.com/jacoda/
	scp movies.jacoda.js osricwww:/var/www/osric.com/jacoda/
	scp movies.json.js osricwww:/var/www/osric.com/jacoda/

