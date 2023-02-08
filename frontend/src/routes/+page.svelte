<script lang="ts">
  import type { Info as InfoType } from "../../../types";
  import Info from "../components/info.svelte";
  import Search from "../components/search.svelte";

  let info = JSON.parse(localStorage.getItem("data") || "") as InfoType;
</script>

<Search />
<Info {info} />
