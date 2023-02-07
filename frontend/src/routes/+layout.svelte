<script lang="ts">
  import { onMount } from "svelte";

    onMount(()=> {
        console.log(document.body)
    })
</script>

<slot/>

<style>
    :global(html, body) {
        padding: 0;
        margin: 0;
        border: none;
    }
</style>