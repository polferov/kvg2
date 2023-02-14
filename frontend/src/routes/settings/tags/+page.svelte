<script lang="ts">
  import { getTags, setTags, type Tag } from "../../../common/storage";
  import Back from "../../../components/back.svelte";

  interface TagModel {
    routes: string;
    color: string;
  }
  function toModel(tag: Tag): TagModel {
    return {
      routes: tag.routes.join(" "),
      color: tag.color,
    };
  }
  function fromModel(model: TagModel): Tag {
    return {
      routes: model.routes.split(/[ ;,]/g),
      color: model.color,
    };
  }
  function isNonTrivial(tag: Tag | TagModel) {
    return tag.color.length > 0 || tag.routes.length > 0;
  }

  let models = getTags().map(toModel);
  function addTrivial() {
    models.push({ routes: "", color: "" });
  }
  addTrivial();

  function save() {
    const tags = models.filter(isNonTrivial).map(fromModel);
    setTags(tags);
    if (tags.length === models.length) {
      addTrivial();
    }
  }
</script>

<Back />
<p>
  here you can tag routes.
</p>
<p>
  routes is a space, comma, or semicolon separated list of routes. color is a css color (e.g. red or #ff22bd)
</p>
<ul class="tags">
  {#each models as model}
    <li class="tag">
      <div class="labeled-input">
        <span>routes</span>
        <input on:keyup={save} bind:value={model.routes} />
      </div>
      <div class="labeled-input">
        <span>color</span>
        <input on:keyup={save} bind:value={model.color} />
      </div>
    </li>
  {/each}
</ul>

<style>
  .tags {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .tag {
    border: solid 2px;
    margin-bottom: 1rem;
    padding: .5rem;
    border-radius: .5rem;
  }

  .labeled-input {
    margin-block: .5rem;
    display: flex;
    flex-direction: column;
  }

  .labeled-input * {
    display: block;
  }
</style>