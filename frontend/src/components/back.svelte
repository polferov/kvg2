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
    background: #aaa;
  }
</style>
