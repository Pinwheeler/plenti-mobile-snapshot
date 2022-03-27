/* 1:1 parity with Spring Boot Pageable object for paging requests */
// tslint:disable: no-string-literal

export interface IPageable {
  page?: number;
  size?: number;
  sort?: SortObj[];
}

export class Pageable {
  page?: number;
  size?: number;
  sort?: SortObj[];

  constructor(model: IPageable) {
    this.page = model.page;
    this.size = model.size;
    this.sort = model.sort;
  }

  // toParams(): { [key: string]: string } {
  //   const value: t = {};
  //   if (this.page) {
  //     value.page = this.page;
  //   }
  //   if (this.size) {
  //     value["size"] = this.size;
  //   }
  //   if (this.sort) {
  //     const sortVals = this.sort.map((s) => `${s.parameter},${s.direction}`);
  //     value["sort"] = sortVals;
  //   }
  //   return value;
  // }
}

export interface SortObj {
  parameter: string;
  direction: SortDirection;
}

export type SortDirection = "asc" | "desc";

// tslint:enable: no-string-literal
