<script lang="ts">
  import { onMount } from "svelte";

  onMount(() => {
    // do something with dark mode
    // console.log(document.body)
  });
</script>

<slot />

<style>
  :global(:root, :root *) {
    font-family: 'sans';
  }
</style>