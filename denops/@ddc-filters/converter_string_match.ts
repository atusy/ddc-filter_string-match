import { BaseFilter, Item } from "https://deno.land/x/ddc_vim@v3.9.1/types.ts";

type Params = { regexp: string, flags: string | undefined };

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
      // const newItem = { ...item }
      const newItem = JSON.parse(JSON.stringify(item));
      newItem.abbr = newItem.abbr ?? newItem.word;
      const matches = newItem.word.match(re) ?? [];
      newItem.word = matches[0] ?? newItem.word;
      return newItem
    }));
  }

  override params(): Params {
    return { regexp: "", flags: undefined };
  }
}
