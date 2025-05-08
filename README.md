# ddc-filter_string-match

Regexp-based matcher and converter for [ddc.vim](https://github.com/Shougo/ddc.vim).

Typical usecase is to match to items that starts with a word, and then converts them to a word.
If matcher is not applied, then unmatched items are left asis.

- `foo bar` -> `foo`
- `(foo bar)` -> `(foo bar)`

```vim
call ddc#custom#patch_global('sourceOptions', #{
      \   _: #{
      \     converters: ['converter_string_match'],
      \     matchers: ['matcher_string_match'],
      \   }
      \ })

call ddc#custom#patch_global('filterParams', #{
      \   converter_string_match: #{
      \     regexp: "^[a-zA-Z0-9_]+"
      \     convertAbbr: v:true
      \   }
      \   converter_string_match: #{
      \     regexp: "^[a-zA-Z0-9_]+"
      \   }
      \ })
```
