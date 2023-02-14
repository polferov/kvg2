<script lang="ts">
  import {
    setShowTimeInMinutesEnabled,
    showTimeInMinutesEnabled,
  } from "../common/storage";
  let enabled = showTimeInMinutesEnabled();

  function update(...trigger: any[]) {
    setShowTimeInMinutesEnabled(enabled);
  }

  $: _ = update(enabled);
</script>

<div class="container">
  <input type="checkbox" id="show-time-in-minutes" bind:checked={enabled} />
  <label for="show-time-in-minutes"
    >Show time in in minutes and seconds instead of just seconds</label
  >
</div>

<style>
  .container {
    margin-block: 0.5rem;
    border: var(--brd-base);
    border-radius: var(--brd-r-base);
    padding: .25rem;
  }
</style>
