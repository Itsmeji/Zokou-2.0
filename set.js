const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0oyaGRkTzFNd0ZoYVl5dENmcHY4Q0x3dzE1U3hGMTFGVkRnTXdwRTFIVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMFVSM3JFQTViK251dEZ1VDh4QTFCRG1OQWZIdVpDVlF3VlNnOXJ1VnhWUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4QS9PZGZNdG50c01mTEhmcGxvTkZoY0Z2eWkvRTlPNzhsd0YwdTR2NmxnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrRkhmNFBvbTU5SkJrWTh6WnBQdTZwc1JGZzFDRThHd09Ta3FjYjVUMGg4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVHcWVhYmpaOU43K0YwU0FFVGhTQzBkUERRRjZpSmdZT2Z0MElmM1FzR2s9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNOcFZ2c0RySzlyVDhDdjh2aTRMbkdoeVRMQXh1aVFIWWF3R3M1RnlXVkk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNENvM09KVVlnUEY2ZVNzN2UvSk4raEJJZi8wSnpVbEVjZEpyczBFbGtIcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUU4xM0p2Ynk4TnRLbHc1Wk9Edy9JN2dwTDVDTHNMYnFDNWw5WVRlcEdTOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9MNDdrUjd3YnZlT2hOcE1Ob2pzV1JpazV0UEovSjE2Yk40RGozMlk0dk8yUjVZVlIzY0tEdTBva2lhVE9meFppREJwUnViVFg5VCt4WmhTY09kU0J3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTQsImFkdlNlY3JldEtleSI6IkFDRVhoeUEzR1A4Z2VNY3RaSlovRStKK05oV05jU2l4a3VodlU0RDJEQnM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjFMWG42cmktVEotTkRkSklOaE9UX1EiLCJwaG9uZUlkIjoiZGJiMTk4YzMtZTVkYS00YzNiLWEzNWQtNWRjM2QyOWM4MmM5IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJoTHp5aXpLUEJFeGlJWkEyNU0vOHQ3RlVvZz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlK0dkTnhPNU1Pb3BLV2UyNzB2Wm5kM1dsS3c9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiQVY3OFpDVk4iLCJsYXN0UHJvcEhhc2giOiIxdjRBNmMiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBd0lEUT09In0sIm1lIjp7ImlkIjoiMjI4OTk4Njk2MDE6NTJAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIxNzU0NjY1OTM5Mzk2ODE6NTJAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMcmN1SndERUl2UXVyUUdHQXdnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJrWEFZNWlYcmN4M3gyMjU1aCt5UHd4SDAvalplcGZCNTJxK21wbXlmUENnPSIsImFjY291bnRTaWduYXR1cmUiOiI1MEJ6bytiemVla3RBZCtBRVk5aHhQemxQSzViOHdwV0V6a0o4ZHpVbzlCaVRIazZObTJmaTFBRXg3dTRTNS9IRlA2cW44cjFnbmVPckhmUTB5OEFCUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiQzkxU1hWUmo5MzNrZXBGelloTVlQbjZydWFLNHBBUjJqNml0NU1LQXVpN1M3dkxxaExndFBPREdWZy96WG9iK3hZdzJpa3lFK3F4b3M1cGIvWE9TQVE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMjg5OTg2OTYwMTo1MkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJaRndHT1lsNjNNZDhkdHVlWWZzajhNUjlQNDJYcVh3ZWRxdnBxWnNuendvIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIwNjI1MTY2LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUJrVCJ9',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE,
    NOM_OWNER: process.env.NOM_OWNER || "Israfel Kurosaki",
    NUMERO_OWNER : process.env.NUMERO_OWNER,              
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'oui',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'SCP foundation bot',
    URL : process.env.LIENS_MENU || 'https://telegra.ph/file/ae98afe04c41d36bca2c0.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'non',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'oui',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
