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

<div>
  <input type="checkbox" id="show-time-in-minutes" bind:checked={enabled} />
  <label for="show-time-in-minutes"
    >Show time in in minutes and seconds instead of just seconds</label
  >
</div>
