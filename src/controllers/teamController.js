const Team = require('../models/Team');
const User = require('../models/User');
const UserTeam = require('../models/UserTeam');

const createTeam = async (req, res) => {
    const { teamName, teamDescription, memberIds } = req.body;
    try {
        const team = await Team.create({
            teamName,
            teamDescription
        });
        await Promise.all(memberIds.map(async (userId) => {
            await UserTeam.create({
                teamId: team.teamId,
                userId
            });
        }));
        res.status(201).json({ message: 'Team created successfully', team });
    } catch (error) {
        console.error('Error creating team:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { createTeam };