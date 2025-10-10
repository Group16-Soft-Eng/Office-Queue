import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("TICKET")
export class TicketDAO {
	@PrimaryColumn({ nullable: false })
	id_ticket: string;

	@Column({ nullable: false })
	id_counter: number;

	@Column({ nullable: false })
	service_type: string;

	@Column({ nullable: false })
	date: string;
}
