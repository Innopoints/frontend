<script>
  import {onMount} from 'svelte';
  import {changeUser} from '@/store/user';
  import request from '@/utils/request';
  onMount(async () => changeUser(await request(fetch, '/account', 'GET')));
</script>

<slot />
