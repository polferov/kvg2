<script lang="ts">
  import type { InfoItem as InfoItemType } from "../../../types";
  import { getTagsOf, showTimeInMinutesEnabled } from "../common/storage";
  export let item: InfoItemType;
  $: tags = getTagsOf(item.patternText);
  let showInMins = showTimeInMinutesEnabled();
  function relativeTime(relative: number): string {
    if (relative < 0) return `-${relativeTime(-relative)}`;
    if (!showInMins) return relative.toString();
    return `${Math.floor(relative / 60)}:${relative % 60}`;
  }
</script>

<li class="item">
  <div>
    <span class="pattern">{item.patternText}</span><span>{item.direction}</span>
  </div>
  <div class="times-and-tags">
    <div class="times">
      {#if item.actualTime !== item.plannedTime && item.plannedTime !== undefined}
        <span class="planned">
          {item.plannedTime}
        </span>
      {/if}
      <span>{item.actualTime || item.plannedTime}</span>
    </div>
    {#if tags.length > 0}
      <ul class="tags">
        {#each tags as tag}
          <li>
            <div class="tag" style="background-color: {tag.color};" />
          </li>
        {/each}
      </ul>
    {/if}
  </div>
  <div class="relative-time">
    <span>{relativeTime(item.actualRelativeTime)}</span>
  </div>
</li>

<style>
  .item {
    margin-bottom: 0.25rem;
    padding-block: 0.5rem;
    padding-inline: 0.75rem;
    border: var(--brd-base);
    border-radius: var(--brd-r-info);
  }

  .planned {
    text-decoration: line-through;
    margin-right: 0.25rem;
  }

  .tag {
    width: 1rem;
    height: 1rem;
    display: inline-block;
  }

  .tags {
    list-style: none;
    display: inline-block;
  }

  .tags li {
    display: inline;
  }

  .times-and-tags {
    display: flex;
    justify-content: space-between;
  }

  .pattern {
    font-weight: 700;
    margin-right: 1rem;
  }
</style>
