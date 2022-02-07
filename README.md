
# DiscordJS V13+ Bot Boilerplate

A boilerplate to develop discord bots using discord.js v13+



## Installation

Install dependencies

```bash
  npm install
```

To start the app in development

```bash
  npm run start:dev
```

To start the app in production

```bash
  npm run start:prod
```

## Deployment

The application has a Docker configuration, you must setup the environment variables then run docker using the following command:

```bash
  docker-compose up
```
    
## Environment Variables

When you run this project in development, it injects a dotenv script, you will need to create a .env file and add the following environment variables:

`DISCORD_BOT_TOKEN`

`DISCORD_GUILD_IDS` (optional)


## Authors

- [David Marcos](https://www.github.com/davidamarcosp)
- [Ruben Valdes](https://www.github.com/jkeroz)


