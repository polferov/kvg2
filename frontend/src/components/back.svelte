<script lang="ts">
  function back() {
    history.back();
  }
</script>

<button class="back" on:click={back}>
  {"<"}
</button>

<style>
  .back {
    border: none;
    width: 2rem;
    height: 2rem;
    background: var(--clr-not-bg);
    color: var(--clr-txt)
  }
  .back:hover {
    background: var(--clr-link-hvr)
  }
</style>
