<script context="module">
  import {API_HOST} from '@/constants/env';
  export async function preload() {
    try {
      return await this.fetch(API_HOST + 'account');
    } catch (e) {
      return null;
    }
  }
</script>

<slot />
