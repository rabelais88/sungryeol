export interface IWorkMDXFrontMatter {
  title: string;
  captures?: {
    mobile: string[];
    desktop: string[];
    /** video embed url from vimeo */
    video: string[];
  };
  url?: string;
}

/* 20XX-XX-XX */
export type StrDate = `${number}-${number}-${number}`;

/** new Date(timestamp * 1000) is necessary */
export type TimestampUTC = number;
export type StackExchangeUser = {
  last_request_date?: TimestampUTC;
  badge_counts: { bronze: number; silver: number; gold: number };
  account_id: number;
  is_employee: boolean;
  last_modified_date: TimestampUTC;
  last_access_date: TimestampUTC;
  reputation_change_year: number;
  reputation_change_quarter: number;
  reputation_change_month: number;
  reputation_change_week: number;
  reputation_change_day: number;
  reputation: number;
  creation_date: TimestampUTC;
  user_type: 'registered';
  user_id: number;
  website_url: string;
  /** url to stackoverflow page */
  link: string;
  profile_image: string;
  display_name: string;
};
