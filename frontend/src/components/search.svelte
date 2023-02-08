<script lang="ts">
  import type { Stop } from "../../../types";
  import { getStops } from "../common/api";
  import { cacheStops, getCachedStops } from "../common/storage";
  export let select : (stop: Stop) => void
  let query = "";
  let options: Stop[] = getCachedStops()

  getStops().then((s) => {
    console.log(s)
    options = s;
    cacheStops(s);
  });
  
  function results(opts : Stop[], q: string) {
    return opts.filter((o) =>
      o.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );
  }
  $: autocomplete = results(options, query);
  let hideAutocomplete = true;

  function chooseStop(stop: Stop) {
    query = stop.name
    select(stop)
  }
</script>

<div class="search-container">
  <input
    type="search"
    class="search-input"
    bind:value={query}
    on:focus={() => (hideAutocomplete = false)}
    on:blur={() => setTimeout(() => (hideAutocomplete = true), 0)}
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
