<script lang="ts">
  import type { Stop } from "../../../types";
  import { getStops, tryAddStop } from "../common/api";
  import {
    cacheStops,
    getCachedStops,
    getHistory,
    getHistoryIndex,
    getLastSelectedStop,
    setLastSelectedStop,
  } from "../common/storage";
  export let select: (stop: Stop) => void;
  let query = "";
  let options: Stop[] = getCachedStops();
  let searchInput: HTMLInputElement;

  function initStops() {
    getStops().then((s) => {
      s.sort((a, b) => a.name - b.name);
      options = s;
      cacheStops(s);
    });
  }

  initStops();

  function shouldShowHistory(): boolean {
    return (
      query === "" ||
      (searchInput &&
        searchInput.selectionStart === 0 &&
        searchInput.selectionEnd === searchInput.value.length)
    );
  }

  function results() {
    if (shouldShowHistory()) return getHistory().reverse();
    const result = options
      .filter((o) =>
        o.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      )
      .sort((a, b) => getHistoryIndex(b) - getHistoryIndex(a));

    if (result.length === 0) trySearch().then();

    return result;
  }

  let autocomplete: Stop[];
  function update(...triggers: any[]) {
    autocomplete = results();
  }
  update();
  $: _ = update(options, query);
  let hideAutocomplete = true;

  function chooseStop(stop: Stop) {
    query = stop.name;
    select(stop);
    setLastSelectedStop(stop);
  }

  {
    const lastSelectedStop = getLastSelectedStop();
    if (lastSelectedStop !== null) chooseStop(lastSelectedStop);
  }

  document.addEventListener("selectionchange", () => {
    if (document.activeElement !== searchInput) return;
    update();
  });

  let requestSearchElement: HTMLButtonElement;
  async function onBlur() {
    const p = new Promise<void>((resolve) => setTimeout(() => resolve(), 0));
    await p;
    if (document.activeElement === requestSearchElement) return;
    hideAutocomplete = true;
  }

  async function trySearch() {
    if (query.length === 0) return;
    await tryAddStop(query);
    initStops();
  }
</script>

<div class="search-container">
  <input
    type="text"
    class="search-input"
    bind:value={query}
    on:focus={() => {
      hideAutocomplete = false;
      if (query === "") return;
      searchInput.select();
    }}
    on:contextmenu={e => e.preventDefault()}
    on:blur={onBlur}
    on:select={update}
    bind:this={searchInput}
    autocomplete="off"
  />
  <ul class="autocomplete" style={hideAutocomplete ? "display:none;" : ""}>
    {#each autocomplete as stop}
      <li class="autocomplete-item">
        <button
          class="autocomplete-item-content"
          on:focus={() => chooseStop(stop)}>{stop.name}</button
        >
      </li>
    {/each}
    {#if autocomplete.length > 0 && !shouldShowHistory()}
      <li class="autocomplete-item">
        <button
          class="autocomplete-item-content"
          bind:this={requestSearchElement}
          on:focus={() => {
            trySearch().then();
            searchInput.focus();
          }}>search...</button
        >
      </li>
    {/if}
  </ul>
</div>

<style lang="scss">
  .search-container {
    position: relative;
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
  }

  .search-input {
    border: solid 2px;
    padding-inline: 0.75rem;
    display: block;
    background-color: inherit;
    height: 2rem;
    border-radius: 0.5rem;
    font-size: inherit;
    color: inherit;
  }

  .autocomplete {
    list-style: none;
    padding: 0;
    margin: 0;
    margin-top: 2px;
    position: absolute;
    width: 100%;
    background-color: var(--clr-bg);
    top: 100%;
    right: 0;
    left: 0;
  }

  .autocomplete-item {
    @extend .search-input;
    width: auto;
    margin-bottom: 2px;
    height: auto;
    border: solid 2px;
  }

  .autocomplete-item:hover {
    background-color: var(--clr-red);
  }

  .autocomplete-item-content {
    border: none;
    background-color: transparent;
    text-align: left;
    margin: 0;
    padding-inline: 0;
    padding-block: .25rem;
    font-size: inherit;
    color: inherit;
  }
</style>
