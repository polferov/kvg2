<script lang="ts">
  import type { Info as InfoType, Stop } from "../../../types";
  import { getInfo } from "../common/api";
  import Info from "../components/info.svelte";
  import Search from "../components/search.svelte";
  let selectedStop: Stop | null = null;

  let info: InfoType | null = null;

  async function run() {
    while (true) {
      if (selectedStop !== null) info = await getInfo(selectedStop);
      let p = new Promise<void>((resolve) =>
        setTimeout(() => resolve(), 1000 - (Date.now() % 1000))
      );
      await p;
    }
  }

  run().then();
</script>

<Search select={(s) => (selectedStop = s)} />
{#if info !== null}
  <Info {info} />
{/if}
