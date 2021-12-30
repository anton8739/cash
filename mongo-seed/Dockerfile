FROM mongo
COPY init.json /init.json
CMD mongoimport --host cash-db --db cash --collection users --type json --file /init.json --jsonArray