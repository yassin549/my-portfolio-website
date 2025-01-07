<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from '$app/environment';
  import { fade } from 'svelte/transition';
  import Dock from '$lib/components/Dock.svelte';
  import Terminal from '$lib/components/Terminal.svelte';
  import Safari from '$lib/components/Safari.svelte';
  import Photos from '$lib/components/Photos.svelte';
  import Projects from '$lib/components/Projects.svelte';
  import Window from '$lib/components/Window.svelte';
  import Launchpad from '$lib/components/Launchpad.svelte';
  import MenuBar from '$lib/components/MenuBar.svelte';
  import Loading from '$lib/components/Loading.svelte';
  import githubIcon from '$lib/assets/icons/github.png';
  import { windows, addWindow, isAppRunning, isAppMinimized } from '$lib/stores/windowStore';

  export let form: Record<string, any> | null = null;
  let isLaunchpadOpen = false;
  let isLoading = true;
  let hour = new Date().getHours();
  let backgroundClass = hour >= 18 || hour < 6 ? 'night' : 'day';

  onMount(() => {
    if (browser) {
      document.title = "Home | Yassin";
      if (window.innerWidth >= 768) {
        addWindow("terminal");
      }
      setInterval(() => {
        hour = new Date().getHours();
        backgroundClass = hour >= 18 || hour < 6 ? 'night' : 'day';
      }, 60000);
    }
  });

  function handleLaunchApp(event: CustomEvent<string>) {
    const type = event.detail;
    addWindow(type as any);
    isLaunchpadOpen = false;
  }

  function handleLoadingFinished() {
    isLoading = false;
  }
</script>

{#if isLoading}
  <Loading onFinished={handleLoadingFinished} />
{/if}

<div 
  class="relative w-screen h-screen overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500"
  class:opacity-0={isLoading}
  class:opacity-100={!isLoading}
  class:transition-opacity={true}
  class:duration-500={true}
>
  <!-- Menu Bar -->
  <MenuBar />

  <!-- Desktop Icons -->
  <div class="absolute top-4 right-4 flex flex-col space-y-4">
    <a 
      href="https://github.com/yassin549" 
      target="_blank" 
      rel="noopener noreferrer"
      class="flex flex-col items-center group p-2 rounded-lg hover:bg-white/10 transition-colors"
    >
      <img 
        src={githubIcon} 
        alt="GitHub Profile"
        class="w-16 h-16 group-hover:scale-110 transition-transform"
      />
      <span class="text-white text-sm mt-1 bg-black/30 px-2 py-0.5 rounded">GitHub</span>
    </a>
  </div>

  <!-- Windows -->
  {#each $windows as window (window.id)}
    <Window {window} />
  {/each}

  <!-- Launchpad -->
  {#if isLaunchpadOpen}
    <Launchpad 
      isOpen={isLaunchpadOpen} 
      on:launchApp={handleLaunchApp}
      on:close={() => isLaunchpadOpen = false}
    />
  {/if}

  <!-- Dock -->
  <div class="fixed bottom-0 left-0 right-0 flex justify-center p-2">
    <Dock
      {isAppRunning}
      {addWindow}
      on:openLaunchpad={() => isLaunchpadOpen = true}
    />
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  }
</style>
