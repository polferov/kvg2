<script lang="ts">
  import type { InfoItem as InfoItemType } from "../../../types";
  import { getTagsOf } from "../common/storage";
  export let item: InfoItemType;
  let tags = getTagsOf(item.patternText);
</script>

<li class="item">
  <span>{item.patternText} -> {item.direction}</span>
  <div class="times-and-tags">
    <div>
      {#if item.actualTime !== item.plannedTime && item.plannedTime !== undefined}
        <span class="planned">
          {item.plannedTime}
        </span>
      {/if}
      <span>{item.actualTime || item.plannedTime}</span>
    </div>
    {#if tags.length > 0}
      <ul>
        {#each tags as tag}
          <li>
            <div class="tag" style="background-color: {tag.color};" />
          </li>
        {/each}
      </ul>
    {/if}
  </div>
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

  .tag {
    width: 1rem;
    height: 1rem;
    display: inline-block;
  }

  ul {
    display: inline;
  }

  ul li {
    list-style: none;
    display: inline;
  }

  .times-and-tags {
    display: flex;
    justify-content: space-between;
  }
</style>
