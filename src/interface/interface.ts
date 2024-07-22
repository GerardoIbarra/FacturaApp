export interface Payment {
  UUID: string;
  UID: string;
  Folio: string;
  FechaTimbrado: string;
  Receptor: string;
  RazonSocialReceptor: string;
  ReferenceClient: number;
  Total: string;
  Subtotal: string;
  NumOrder: string | null;
  Status: StatusType;
  Version: string;
  document?: string;
}

export interface ListResponse {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  data: Payment[];
}

export interface Concepto {
  ClaveProdServ: string;
  Cantidad: number;
  ClaveUnidad: string;
  Unidad: string;
  ValorUnitario: number;
  Descripcion: string;
  Descuento?: string;
}

export interface Traslado {
  Base: number;
  Impuesto: string;
  TipoFactor: string;
  TasaOCuota: number;
  Importe: number;
}

export interface Local {
  Base: number;
  Impuesto: string;
  TipoFactor: string;
  TasaOCuota: number;
  Importe: number;
}

export interface Impuestos {
  Traslados: Traslado[];
  Locales: Local[];
}

export interface CfdiData {
  Receptor: {
    UID: string;
  };
  TipoDocumento: string;
  Conceptos: Concepto[];
  UsoCFDI: string;
  Serie: number;
  FormaPago: string;
  MetodoPago: string;
  Moneda: string;
  EnviarCorreo: boolean;
}
export type StatusType =
  | "Enviada"
  | "Eliminada"
  | "Pendiente"
  | "Cancelada"
  | "Rechazada"
  | "Autorizada"
  | "Anulada"
  | "enviada"
  | "eliminada"
  | "pendiente"
  | "cancelada"
  | "rechazada"
  | "autorizada"
  | "anulada";
