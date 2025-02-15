const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

exports.command = new SlashCommandBuilder()
    .setName('roleinfo')
    .setDescription('View information about the given role')
    .addRoleOption(option => option.setName('target').setDescription('Select a role').setRequired(true));
exports.execute = async (interaction) => {
    try {
        await interaction.deferReply();

        const role = interaction.options.getRole('target');
        const members = role.members.map((member) => member.user.username);
        const roleInfoEmbed = new MessageEmbed()
            .setColor('#992d22')
            .setDescription(`**${role.name}**`)
            .addFields(
                { name: 'Users', value: `${role.members.size}`, inline: true },
                { name: 'Mentionable', value: `${role.mentionable}`, inline: true },
                { name: 'Hoist', value: `${role.hoist}`, inline: true },
                { name: 'Position', value: `${role.position}`, inline: true },
                { name: 'Managed', value: `${role.managed}`, inline: true },
                { name: 'Color', value: `${role.hexColor}`, inline: true },
                {
                    name: 'Creation Date',
                    value: new Date(role.createdTimestamp).toLocaleString(),
                    inline: false,
                },
                { name: 'Members', value: members.join(', '), inline: false },
                { name: 'Role ID', value: role.id, inline: false }
            );
        await interaction.editReply({ embeds: [roleInfoEmbed] });
    } catch (error) {
        console.error(error);
    }
};