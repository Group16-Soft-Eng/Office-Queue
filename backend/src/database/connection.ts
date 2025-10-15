import "reflect-metadata";
import { DataSource } from "typeorm";
import { CONFIG } from "@config";

export const AppDataSource = new DataSource({
	type: "sqlite",
	database: CONFIG.DB_NAME,
	entities: CONFIG.DB_ENTITIES,
	synchronize: true,
	logging: false,
});

export async function initializeDatabase(): Promise<void> {
	try {
		await AppDataSource.initialize();
		console.log("Successfully connected to DB");
	} catch (error) {
		console.error("Error initializing database:", error);
		throw error;
	}
}

export async function closeDatabase(): Promise<void> {
	try {
		await AppDataSource.destroy();
		console.log("Database connection closed.");
	} catch (error) {
		console.error("Error while closing database:", error);
	}
}
