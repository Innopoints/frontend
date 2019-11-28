<script>
  import Button from 'ui/button.svelte';
  import Switch from 'ui/switch.svelte';
  import FormFields from '@/components/item/form-fields.svelte';
  import FormVariety from '@/components/item/form-variety.svelte';

  import {item, toggleSizes, addVariety} from '@/store/item';
</script>

<form>
  <FormFields />

  <header class="varieties">
    <h2>Varieties</h2>
    <Switch checked={$item.inSizes} on:click={toggleSizes} name="sizes" id="sizes">
      the product comes in sizes
    </Switch>
  </header>

  <ul>
    {#each $item.varieties as v, i (i)}
      <FormVariety
          index={i}
          removable="{i !== 0}"
      />
    {/each}

    <li class="more">
      <Button on:click={addVariety}>
        <svg src="/images/icons/plus.svg" class="icon" />
        add another variety
      </Button>
    </li>
  </ul>
</form>
