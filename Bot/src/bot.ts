import { GatewayIntentBits, MessageFlags } from "discord.js";
import { config } from "dotenv";
import fs from "fs";
import path from "path";
import { ExtendedClient } from "./types/ClientExt";

config();

const client = new ExtendedClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Load Commands
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js") || file.endsWith(".ts"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if (!command.data || !command.data.name) {
    console.warn(`⚠️ Skipping invalid command file: ${file}`);
    continue;
  }

  client.commands.set(command.data.name, command);
}

// Register Slash Commands
client.once("ready", async () => {
  console.log(`✅ Logged in as ${client.user?.tag}`);

  const commands = client.commands.map((cmd) => cmd.data.toJSON());
  await client.application?.commands.set(commands);

  client.user?.setPresence({
    activities: [{ name: "support threads", type: 3 }],
    status: "online",
  });

  console.log("✅ Commands registered!");
});

// Handle Commands
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: "❌ An error occurred while executing the command!", flags: MessageFlags.Ephemeral });
  }
});

// Login
client.login(process.env.TOKEN);
