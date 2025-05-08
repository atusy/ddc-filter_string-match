import { type Item } from "jsr:@shougo/ddc-vim@~9.1.0/types";
import { BaseFilter } from "jsr:@shougo/ddc-vim@~9.1.0/filter";

type Params = {
  regexp: string;
  flags: string | undefined;
};

export class Filter extends BaseFilter<Params> {
  override filter(args: {
    filterParams: Params;
    completeStr: string;
    items: Item[];
  }): Promise<Item[]> {
    const regexp = new RegExp(args.filterParams.regexp);
    return Promise.resolve(args.items.filter(
      (item) => item.word.match(regexp) !== null,
    ));
  }

  override params(): Params {
    return { regexp: "", flags: undefined };
  }
}
