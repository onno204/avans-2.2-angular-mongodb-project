#Avans Appstore
### Angular
De frontend van deze app is geschreven in angular onder /Frontend/

### MongoDB
Voor de backend van deze app is MongoDB in met express(NodeJS) gebruikt.

###Development server starten
1. Copy-paste `.env.example` naar `.env`
2. Build alles met `npm run build`
3. Start de development omgeving met `npm run dev`, dit start zowel de frontend als backend.
4. Start met development

###Deployments
Deployments gaat via 2 servers, 1 frontend en 1 backend server.
#####Frontend deployment
1. "Copy" de .env variables naar de server.
2. Run `npm run buildProd`
3. Commit to git
4. _de Heroku pipeline moet nu automatisch de frontend deployen_

Frontend deployed naar: https://avans-app-2-2.herokuapp.com/

#####Backend deployment
1. "Copy" de .env variables naar de server.
2. Zorg ervoor de in de .env de `IS_BACKEND=1` op `1` staat. Dit zorgt ervoor dat de backend op de publieke Heroku poort draait.
3. Aangezien Heroku maar 1 build tegelijkertijd kan moet je deze handmatig deployen.

Backend deployed naar: https://avans-app-2-2-backend.herokuapp.com/
