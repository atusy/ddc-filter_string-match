import { type Item } from "jsr:@shougo/ddc-vim@~9.1.0/types";
import { BaseFilter } from "jsr:@shougo/ddc-vim@~9.1.0/filter";

type Params = {
  regexp: string;
  captures: number[];
  flags: string | undefined;
  convertAbbr: boolean;
};

export class Filter extends BaseFilter<Params> {
  override filter(args: {
    filterParams: Params;
    completeStr: string;
    items: Item[];
  }): Promise<Item[]> {
    if (args.filterParams.regexp == "") {
      return Promise.resolve(args.items);
    }
    const re = new RegExp(args.filterParams.regexp, args.filterParams.flags);
    return Promise.resolve(args.items.map((item) => {
      const word = item.word;
      const matches = word.match(re) ?? [];
      for (const cap of args.filterParams.captures) {
        if (matches[cap]) {
          item.word = matches[cap];
          break;
        }
      }
      if (args.filterParams.convertAbbr) {
        item.abbr = item.word;
      } else if (item.abbr == null) {
        item.abbr = word;
      }
      return item;
    }));
  }

  override params(): Params {
    return {
      regexp: "",
      captures: [0],
      flags: undefined,
      convertAbbr: false,
    };
  }
}

