//! TICKET DAO

import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("TICKET") // key = (id_ticket, date)

export class TicketDAO {
	@PrimaryColumn({ type: "integer", nullable: false })
	id_ticket: number;

	@Column({ type: "integer", nullable: false })
	id_counter: number;

	@Column({ nullable: false })
	service_type: string;

	@PrimaryColumn({ type: "text", nullable: false })
	date: string;
}
