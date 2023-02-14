<script>
  import Back from "../../components/back.svelte";
  import ThemePicker from "../../components/themePicker.svelte";
</script>

<Back />

<h1>Settings</h1>

<h2>Theme</h2>

<ThemePicker />

<h2><a href="tags/">Tags</a></h2>
<p>
  here you can add color tags to you busses so it's easier to find then in the
  list
</p>

<h2>
  <a target="_blank" rel="noreferrer" href="https://github.com/polferov/kvg2"
    >View on GitHub</a
  >
</h2>
<p>
  view this project and its source code on GitHub. You are free to contribute.
</p>

<h2>Build info</h2>

<div>
  <p>
    commit <a
      target="_blank"
      rel="noreferrer"
      href="https://github.com/polferov/kvg2/tree/::COMMIT::">::COMMIT::</a
    >
  </p>
  <p>built ::DATE::</p>
</div>

<style>
</style>
