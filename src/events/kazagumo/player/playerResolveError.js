const { EmbedBuilder } = require("discord.js");

module.exports = async (client, player, track, message) => {
    const guild = await client.guilds.cache.get(player.guildId);

    console.error(`[ERROR] Song error from ${guild.name} (${guild.id})`, message);

    if (player.message) player.message.delete().catch((e) => {});

    const channel = await client.channels.cache.get(player.textId);
    const embed = new EmbedBuilder().setColor(client.config.embedColor);

    if (!player.queue.isEmpty) {
        embed.setDescription(`Song got an error. Skipping to the next song...`);

        if (channel) await channel.send({ embeds: [embed] });
    } else {
        embed.setDescription(`Song got an error and the queue is empty. Stopping the player...`);

        if (channel) await channel.send({ embeds: [embed] });
    }

    return player.skip();
};

/**
 * Project: Aurox
 * Author: adh319
 * Company: EnourDev
 * This code is the property of EnourDev and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/xhTVzbS5NU
 */
