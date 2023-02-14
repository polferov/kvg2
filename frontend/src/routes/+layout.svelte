<script lang="ts">
  import { onMount } from "svelte";
  import { getTheme } from "../common/storage";

  onMount(() => {
    document.body.classList.add(getTheme());
  });
</script>

<slot />

<style>
  :global(:root) {
    font-family: "sans";
    --clr-red: #a00;
    --clr-bg: #fff;
    --clr-txt: #000;
    --clr-link: #000;
    --clr-link-hvr: #3d64ff;
    --settings-ico-filter: ;
    --brd-r-base: .5rem;
    --brd-r-info: 1rem;
    --brd-base: solid 2px;
  }

  :global(.amoled) {
    --clr-bg: #000;
    --clr-txt: #fff;
    --clr-link: #fff;
    --settings-ico-filter: invert();
  }

  :global(body) {
    background-color: var(--clr-bg);
    color: var(--clr-txt);
  }

  :global(a) {
    color: var(--clr-link);
  }
  :global(a:hover) {
    color: var(--clr-link-hvr);
  }
</style>
