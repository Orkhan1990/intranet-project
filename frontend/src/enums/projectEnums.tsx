export enum UserRole {
  Admin = "Admin",
  OfficeUser = "OfficeUser",
  ServiceUser = "ServiceUser",
}

export enum Market {
  Local = "Yerli",
  External = "Xarici",
  Based_On_The_Act = "Akt_Əsasında",
}

export enum PayType {
  Cash = "nağd",
  Transfer = "köçürmə",
}

export enum Liquidity {
  Fast = "təcili",
  Normal = "normal",
  Slow = "gec",
}

export enum OrderType {
  Standart_Client = "standart",
  Local_Market = "local",
  Stok = "stok",
}

export enum DeliverType {
  Fast = "təcili",
  Normal_Fast = "normal",
  Planned = "planlaşdırılmış",
}

export enum Type {
  Sachs1 = "sachs1",
  Sachs2 = "sachs2",
  Lemfer = "lemfer",
  Knor = "knor",
  Dt = "dt",
  Hengs = "hengs",
  Man = "man",
}
