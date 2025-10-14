import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("TICKET")
export class TicketDAO {
	@PrimaryColumn({ type: "integer", nullable: false })
	id_ticket: number;

	@Column({ type: "integer", nullable: false })
	id_counter: number;

	@Column({ nullable: false })
	service_type: string;

	// date is part of the composite primary key together with id_ticket
	@PrimaryColumn({ type: "text", nullable: false })
	date: string;
}
