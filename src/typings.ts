export type DiscordSnowflake = `${bigint}`;
export interface ZeppelinLogData {
	id: string;
	guild_id: DiscordSnowflake;
	case_number: string;
	user_id: DiscordSnowflake;
	user_name: string;
	mod_id: DiscordSnowflake;
	mod_name: string;
	type: string;
	audit_log_id: string;
	created_at: string;
	is_hidden: string;
	pp_id: string;
	pp_name: string;
	log_message_id: string;
}
