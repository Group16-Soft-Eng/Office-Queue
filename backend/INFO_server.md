# Server API - Project notes

## Overview

On boot the server has no registered counters. When a counter (officer) powers on, it sends a request to the server to register itself, including its `id` and the services it provides.

The server exposes simple calls to create tickets, provide the next customer to an officer, and mark tickets as completed.

### Main JSON contracts

Examples of JSON payloads exchanged between client (totem/officer) and server.

- Counter registration (counter_officer)

```json
{
  "id": "fghjk",
  "services": [1, 2, 4]
}
```

- Counter keep-alive (keep_alive_officer) (optional)

```json
{
  "id": "$id"
}
```

- New ticket (new_ticket)

```json
{
  "id_ticket": "id_t"
}
```

- Next customer (next_customer_json) - sent by the server to the officer

```json
{
  "id_ticket": "id_t",
  "service_type": "service"
}
```

- Completed ticket (send_ticket_done)

```json
{
  "id_ticket": "id_t",
  "id_counter": "id_c",
  "service_type": "id_s",
  "date": "date"
}
```

- Queue structure (queue)

```json
{
  "service_type": "id_s",
  "ticket_list": [1, 2, 3, 4, ...],
  "avg_service_time": "seconds"
}
```

## Main resources / lists

- `list_queue`: structure containing multiple queues grouped by service type
- `list_officer`: list with id_counter and array/list of services provided
- `list_services`: enum or list of service types (1,2,3,...)

## Endpoints (simplified)

Proposed API calls (schematic):

- `GET /get_ticket` -> returns `new_ticket`
- `POST /register_counter` -> registers a counter (payload: `counter_register`)
- (optional) `PUT /keep_alive` -> keeps a counter active (payload: `keep_alive_counter`)
- `GET /next_Customer` -> returns `next_customer_json`
- `POST /complete_ticket` -> receives `send_ticket_done`

## Project resource map

- Main backend code: `src/` (controllers, repositories, services)
- Database connection: `src/database/connection.ts`
- DTO / DAO / Models: `src/models/`
- Totem routes: `src/routes/TotemRoutes.ts`

---

# Backend folder


## `src` folder

### `config`
TODO

### `controllers`
TODO

### `database`
TODO

### `models`
TODO

### `repositories`
TODO

### `routes`
TODO

### `services`
TODO


## `office_queue`
```sql
CREATE TABLE "TICKET" (
	"id_ticket"	INTEGER NOT NULL UNIQUE,
	"id_counter"	INTEGER NOT NULL,
	"service_type"	TEXT NOT NULL,
	"date"	TEXT NOT NULL,
	PRIMARY KEY("id_ticket","date")
);
```