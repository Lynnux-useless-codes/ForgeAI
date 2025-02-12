import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Check the bot's latency");

export async function execute(interaction: CommandInteraction) {
  const ping = interaction.client.ws.ping;
  await interaction.reply(`🏓 Pong! Latency: **${ping}ms**`);
}
