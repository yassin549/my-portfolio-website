<script lang="ts">
  import "../app.css";
  import { browser } from '$app/environment';
  import { error } from '@sveltejs/kit';

  if (browser) {
    window.onerror = (msg, url, lineNo, columnNo, err) => {
      console.error('Error: ', { msg, url, lineNo, columnNo, err });
      return false;
    };
  }
</script>

<slot />

<style>
  :global(html, body) {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
</style>