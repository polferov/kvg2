<script lang="ts">
  import { getTheme, getThemes, setTheme, Theme } from "../common/storage";

  let theme = getTheme();
  let themes = getThemes();

  function update(...triggers: any) {
    setTheme(theme);
    for (const t of themes) if (t !== theme) document.body.classList.remove(t);
    document.body.classList.add(theme);
  }

  $: _ = update(theme);
</script>

<div class="container" role="radiogroup">
  {#each themes as t}
    <div class="option">
      <input type="radio" bind:group={theme} value={t} id={t} />
      <label for={t}>{t}</label>
    </div>
  {/each}
</div>

<style>
  .container {
    border: var(--brd-base);
    border-radius: var(--brd-r-base);
  }

  .option{
    font-size: 1.2rem;
  }
</style>
