if (!process.env.DISCORD_TOKEN) throw new Error('Missing DISCORD API env token!');
import { readFile } from 'fs/promises';
import { join } from 'path';
import { parse } from '@fast-csv/parse';
import { Rest } from '@cordis/rest';
import { makeRestUtils } from '@cordis/util';
import Collection from '@discordjs/collection';
import type { DiscordSnowflake, ZeppelinLogData } from './typings';

// construct cordis Rest utility to fetch data from Discord API
const discordAPI = makeRestUtils(new Rest(process.env.DISCORD_TOKEN!));
// All Zeppelin action types (omitting deleted and softbanned cause deprecated or useless)
const caseTypes = ['ban', 'unban', 'note', 'warn', 'kick', 'mute', 'unmute'] as const;
// transform array of action types into an Object type correlating action to number for the counter.
type UserToCaseData = { [K in typeof caseTypes[number]]: number };
type UserCounterMapType = Collection<DiscordSnowflake, UserToCaseData>;

const parseRow = (userCounterMap: UserCounterMapType, data: ZeppelinLogData): void => {
	// grab user from counter map, or if it's not there, construct an empty counter object with everything set to 0.
	const userFromCaseMap =
		userCounterMap.get(data.mod_id) ??
		(caseTypes.reduce((prev, curr) => ({ ...prev, [curr]: 0 }), {}) as UserToCaseData);

	// what Zeppelin action type this is.
	const caseType = caseTypes[Number.parseInt(data.type) - 1];

	// Increment action type in counter object.
	userFromCaseMap[caseType]++;

	userCounterMap.set(data.mod_id, userFromCaseMap);
};

const parseUserToCaseData = async (userCounterMap: UserCounterMapType): Promise<void> => {
	for (const [userID, value] of userCounterMap.sort((a, b) => b.ban - a.ban).entries()) {
		/*
            Only regex taken from: https://github.com/discordjs/discord.js/blob/stable/src/structures/MessageMentions.js#L211
            Licensed under MIT -- https://github.com/discordjs/discord.js
        */
		if (!/(\d{17,19})/g.test(userID)) continue; // If for some reason isn't a valid user ID, ignore this cycle (zepp sets a - for unknown actions (??))
		const user = await discordAPI.fetchUser(userID);

		// format user as username#tag
		const usernameWithTag = `${user.username}#${user.discriminator}`;

		// format counter object as a string: "bans: 0, kicks: 4, mute: 5..."
		const transformActionValuestoString = `${Object.keys(value)
			.map((x) => `${x}(s): ${value[x as keyof typeof value]}`)
			.join(', ')}`;

		console.log(`${usernameWithTag}:\n\t${transformActionValuestoString}`);
	}
};

(async () => {
	// go to the root of the project.
	const baseDir = join(__dirname, '..');

	// if user provides a path to their cases.csv then use that or fallback to default.
	const casesFile = await readFile(join(baseDir, process.env.CASES_FILE_PATH ?? 'cases.csv'), 'utf-8');

	// counter to keep track of amount of actions performed by user.
	const userToCase: UserCounterMapType = new Collection();

	// construct CSV parser
	const casesStream = parse({ headers: true })
		// Every time a row is successfully parsed in the CSV block.
		.on('data', (data: ZeppelinLogData) => parseRow(userToCase, data))
		// When CSV string is done being read fully.
		.on('end', () => parseUserToCaseData(userToCase))
		.on('error', console.log);

	// run CSV parser on the case file string.
	casesStream.write(casesFile);
	// destroy parser instance
	casesStream.end();
})();
