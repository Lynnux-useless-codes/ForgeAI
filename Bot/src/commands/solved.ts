import { ThreadChannel, SlashCommandBuilder, CommandInteraction, CommandInteractionOptionResolver, MessageFlags } from "discord.js";
import fs from "fs";
import path from "path";
import Tesseract from "tesseract.js";

const dataFilePath = path.resolve(__dirname, "../../data/support.json");

const loadData = (): any[] => {
  try {
    return JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
  } catch {
    return [];
  }
};

const saveData = (data: any[]) => {
  if (!fs.existsSync(path.dirname(dataFilePath))) {
    fs.mkdirSync(path.dirname(dataFilePath), { recursive: true });
  }
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
};

async function fetchWithRetry(url: string, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const arrayBuffer = await response.arrayBuffer();
      return Buffer.from(arrayBuffer);

    } catch (error) {
      if (attempt === retries) throw error;
      console.log(`Retrying (${attempt}/${retries})...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
}

async function extractTextFromImage(imageUrl: string): Promise<string> {
  try {
    const imageBuffer = await fetchWithRetry(imageUrl);
    if (!imageBuffer) throw new Error("Failed to fetch image");

    const { data } = await Tesseract.recognize(imageBuffer, "eng");
    return data.text.trim();
  } catch (error) {
    console.error("OCR Error:", error);
    return "";
  }
}


export const data = new SlashCommandBuilder()
  .setName("solved")
  .setDescription("Mark a ticket as solved")
  .addStringOption(option =>
    option.setName("message_id").setDescription("The messageID that solved the ticket.").setRequired(true)
  );

export async function execute(interaction: CommandInteraction) {
  const options = interaction.options as CommandInteractionOptionResolver;
  const solvedMessageId = options.getString("message_id", true);
  const thread = interaction.channel;
  if (!(thread instanceof ThreadChannel)) {
    await interaction.reply({ content: `❌ This is not a thread.`, flags: MessageFlags.Ephemeral });
    return;
  }

  interaction.deferReply({flags: MessageFlags.Ephemeral})

  try {
    // Fetch the first message in the thread
    const messages = await thread.messages.fetch({ limit: 1, after: "0" });
    const firstMessage = messages.first();

    if (!firstMessage) {
      await interaction.editReply({ content: `❌ Couldn't fetch the first message.` });
      return;
    }

    // Fetch the solved message
    const solvedMessage = await thread.messages.fetch(solvedMessageId);
    if (!solvedMessage) {
      await interaction.editReply({ content: `❌ Couldn't fetch the solved message.` });
      return;
    }

    // Extract text from images in the first message
    const imageTexts: string[] = [];
    for (const [, attachment] of firstMessage.attachments) {
      if (attachment.contentType?.startsWith("image/")) {
        const text = await extractTextFromImage(attachment.url);
        if (text) imageTexts.push(text);
      }
    }

    const supportData = loadData();

    const solvedEntry = {
      question: firstMessage.content,
      Answer: solvedMessage.content,
      images: imageTexts.length ? imageTexts : undefined,
      thread: thread.id,
    };

    supportData.push(solvedEntry);
    saveData(supportData);

    await interaction.editReply({ content: `✅ Marked as solved.` });

  } catch (error) {
    console.error(error);
    await interaction.editReply({ content: `❌ Something went wrong. Check the console.` });
  }
}
