CREATE TABLE `finances` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`label` text NOT NULL,
	`amount` integer NOT NULL,
	`type` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `finance_tag` (
	`financeId` integer NOT NULL,
	`tagId` integer NOT NULL,
	FOREIGN KEY (`financeId`) REFERENCES `finances`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tagId`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`full_name` text
);
