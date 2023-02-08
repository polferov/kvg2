<script lang="ts">
  import type { Info as InfoType } from "../../../types";
  import { getInfo } from "../common/api";
  import Info from "../components/info.svelte";
  import Search from "../components/search.svelte";

  let info: InfoType | null = null;

  async function run() {
    while (true) {
      info = await getInfo({ id: "2387" });
      let p = new Promise<void>((resolve) =>
        setTimeout(() => resolve(), 1000 - (Date.now() % 1000))
      );
      await p;
    }
  }

  run().then();
</script>

<Search />
{#if info !== null}
  <Info {info} />
{/if}
