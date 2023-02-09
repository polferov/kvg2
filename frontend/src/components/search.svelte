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
      console.log(s);
      options = s;
      cacheStops(s);
    });
  }

  initStops();

  function results() {
    if (
      query === "" ||
      (searchInput &&
        searchInput.selectionStart === 0 &&
        searchInput.selectionEnd === searchInput.value.length)
    )
      return getHistory().reverse();
    return options
      .filter((o) =>
        o.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      )
      .sort((a, b) => getHistoryIndex(b) - getHistoryIndex(a));
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
</script>

<div class="search-container">
  <input
    type="search"
    class="search-input"
    bind:value={query}
    on:focus={() => {
      hideAutocomplete = false;
      if (query === "") return;
      searchInput.select()
    }}
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
          on:focus={() => chooseStop(stop)}>{@html stop.name}</button
        >
      </li>
    {/each}
    {#if autocomplete.length === 0 && query.length > 2}
      <li class="autocomplete-item">
        <button
          bind:this={requestSearchElement}
          class="autocomplete-item-content"
          on:focus={async () => {
            if (await tryAddStop(query)) initStops();
          }}>search</button
        >
      </li>
    {/if}
  </ul>
</div>

<style>
  .search-container * {
    list-style: none;
    border: none;
    width: 100%;
    margin: 0;
    padding: 0;
    font-size: 1.1rem;
  }

  .search-container {
    padding-inline: 10px;
    position: relative;
  }

  .autocomplete-item {
    background: #fff;
    width: calc(100% - 10px);
    padding: 5px;
    margin-bottom: 2px;
    color: #000;
    font-family: "Open Sans", Arial, Helvetica, sans-serif;
  }

  .autocomplete {
    background: #aaa;
    width: calc(100% - 4px);
    border: 2px solid #aaa;
    border-top: none;
    border-bottom: 1px solid #aaa;
    /* display: none; */
  }

  .autocomplete-item:hover {
    background-color: #a00 !important;
    color: #fff;
  }

  .search-input {
    border: 2px inset;
    padding-left: 0.25rem;
  }

  .autocomplete-item-content {
    border: none;
    background-color: transparent;
    text-align: left;
    margin: 0;
  }
</style>
