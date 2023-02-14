<script lang="ts">
  import type { Info as InfoType, Stop } from "../../../types";
  import { getInfo } from "../common/api";
  import Info from "../components/info.svelte";
  import Search from "../components/search.svelte";
  let selectedStop: Stop | null = null;

  let info: InfoType | null = null;

  async function run() {
    while (true) {
      const current = selectedStop;
      if (current !== null) {
        const infoTmp = await getInfo(current);
        if (current.id === selectedStop?.id) info = infoTmp;
      }
      let p = new Promise<void>((resolve) =>
        setTimeout(() => resolve(), 1000 - (Date.now() % 1000))
      );
      await p;
    }
  }

  run().then();

  function select(stop: Stop) {
    if (stop.id === selectedStop?.id) return;
    selectedStop = stop;
    info = null;
  }
</script>

<Search {select} />
<div class="status-bar">
  <a href="settings/"><img alt="Settings" src="icons/settings.png" /></a>
</div>
{#if info !== null}
  <Info {info} />
{/if}

<style>
  .status-bar {
    display: flex;
    flex-direction: row-reverse;
    margin: 10px;
  }
  .status-bar img {
    width: 1.5rem;
    height: 1.5rem;
  }
</style>
