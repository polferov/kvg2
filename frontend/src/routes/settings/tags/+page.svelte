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
<ul>
  {#each models as model}
    <li>
      <span>routes</span>
      <input on:keyup={save} bind:value={model.routes} />
      <span>color</span>
      <input on:keyup={save} bind:value={model.color} />
    </li>
  {/each}
</ul>
