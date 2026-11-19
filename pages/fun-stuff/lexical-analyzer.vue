<template>
  <article>
    <h1>Lexical Analyzer</h1>
    <p>
      I wrote this Java program for a compiler course at university. Lexical analysis is an early step in a compiler:
      it breaks source text into tokens so the next stage can work with things like names and operators.
    </p>
    <h2>What the program does</h2>
    <p>
      It reads <code>input.txt</code> line by line and uses regular expressions to split the text into lexemes.
      It prints the lexemes and a symbol table grouped by category, including keywords, identifiers, numbers,
      and math and comparison operators.
    </p>
    <h2>A small example</h2>
    <p>
      Given <code>int total = 2 + 3;</code>, it lists <code>int</code> as a keyword, <code>total</code> as an
      identifier, <code>2</code> and <code>3</code> as numbers, and <code>=</code> and <code>+</code> as math operators.
      Spaces around the operators matter because this version uses simple text splitting.
    </p>
    <p>
      <a href="https://github.com/navidanindya/lexicalanalyzer" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5" v-text="'View the source on GitHub'" />
    </p>
  </article>
</template>

<script>
import { pageHead } from '~/utils/content'
import { staticSocialCard } from '~/utils/socialCards'

export default {
  // Give the project a canonical URL and its own search description.
  head () {
    return pageHead(staticSocialCard('/fun-stuff/lexical-analyzer'))
  }
}
</script>
