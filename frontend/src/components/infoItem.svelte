<script lang="ts">
  import type { InfoItem as InfoItemType } from "../../../types";
  export let item: InfoItemType;
</script>

<li class="item">
  <span>{item.patternText} -> {item.direction}</span>
  <span>
    {#if item.actualTime !== item.plannedTime && item.plannedTime !== undefined}
      <span class="planned">
        {item.plannedTime}
      </span>
    {/if}
    <span>{item.actualTime || item.plannedTime}</span>
  </span>
  <span>{item.actualRelativeTime}</span>
</li>

<style>
  li {
    margin-bottom: 1rem;
  }

  li > span {
    display: block;
  }

  .planned {
    text-decoration: line-through;
    margin-right: 0.25rem;
  }
</style>
