<script lang="ts">
  import type { Info } from "../../../types";
  import InfoItem from "./infoItem.svelte";
  export let info: Info;
</script>

<div>
  <ul>
    {#each info.actual as infoItem}
      <InfoItem item={infoItem} />
    {/each}
  </ul>
</div>

<style>
  ul {
    list-style: none;
    padding: 0;
  }
</style>
