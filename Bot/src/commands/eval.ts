import { CommandInteraction, SlashCommandBuilder, CommandInteractionOptionResolver, MessageFlags } from "discord.js";

const OWNER_ID = "705306248538488947"; // Replace with your Discord ID

export const data = new SlashCommandBuilder()
  .setName("eval")
  .setDescription("Evaluate JavaScript code (Owner only)")
  .addStringOption(option =>
    option.setName("code").setDescription("Code to evaluate").setRequired(true)
  );

export async function execute(interaction: CommandInteraction) {
  if (interaction.user.id !== OWNER_ID) {
    return interaction.reply({ content: "❌ You are not allowed to use this!", flags: MessageFlags.Ephemeral });
  }

  const options = interaction.options as CommandInteractionOptionResolver;
  const code = options.getString("code", true);

  try {
    const result = await eval(code);
    await interaction.reply(`✅ **Result:**\n\`\`\`js\n${result}\n\`\`\``);
  } catch (error) {
    await interaction.reply(`❌ **Error:**\n\`\`\`js\n${error}\n\`\`\``);
  }
}
