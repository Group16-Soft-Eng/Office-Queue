/*
il mio diagramma di flusso (Nicola):

post da terminal -> server accetta, configura e registra il webSocket/tecnologia utilizzata/MPMC/SPMC/canali comunicazione ->
terminal periodicamente manda un put/patch che fa resettare il timer del server e gli notifica che sia vivo

da ticketRoutes, una volta che viene servito un nuovo cliente, viene mandato l'input ai vari terminal
*/