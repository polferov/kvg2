<script lang="ts">
  import type { Info } from "../../../types";
  export let info: Info;
</script>

<div class="info">
  <ul>
    {#each info.actual as infoItem}
      <li class="item">
        <span>{infoItem.patternText} -> {infoItem.direction}</span>
        <span>
          {#if infoItem.actualTime !== infoItem.plannedTime && infoItem.plannedTime !== undefined}
            <span class="planned">
              {infoItem.plannedTime}
            </span>
          {/if}
          <span>{infoItem.actualTime || infoItem.plannedTime}</span>
        </span>
        <span>{infoItem.actualRelativeTime}</span>
      </li>
    {/each}
  </ul>
</div>

<style>
  .info ul {
    list-style: none;
    padding-left: 0;
  }

  .item {
    margin-bottom: 1rem;
  }

  .item > span {
    display: block;
  }

  .planned {
    text-decoration: line-through;
    margin-right: 0.25rem;
  }
</style>
