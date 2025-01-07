<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import terminalIcon from '$lib/assets/icons/terminal.avif';
  import safariIcon from '$lib/assets/icons/safari.png';
  import photosIcon from '$lib/assets/icons/photos.avif';
  import projectsIcon from '$lib/assets/icons/projects.png';
  import githubIcon from '$lib/assets/icons/github.png';

  export let isOpen: boolean;
  const dispatch = createEventDispatcher();

  const apps = [
    { name: 'Terminal', type: 'terminal', icon: terminalIcon },
    { name: 'Safari', type: 'safari', icon: safariIcon },
    { name: 'Photos', type: 'photos', icon: photosIcon },
    { name: 'Projects', type: 'projects', icon: projectsIcon },
    { 
      name: 'GitHub', 
      type: 'github', 
      icon: githubIcon,
      url: 'https://github.com/yassin549'
    },
  ];

  function handleAppClick(app: any) {
    if (app.url) {
      window.open(app.url, '_blank');
    } else {
      dispatch('launchApp', app.type);
    }
    dispatch('close');
  }

  function handleClose(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      dispatch('close');
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      dispatch('close');
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
  <div
    class="fixed inset-0 bg-black/60 backdrop-blur-xl z-50"
    on:click={handleClose}
    transition:fade={{ duration: 200 }}
  >
    <div 
      class="absolute inset-0 grid place-items-center p-8"
      on:click|stopPropagation
    >
      <div 
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-4xl mx-auto"
        transition:scale={{ duration: 300, easing: quintOut }}
      >
        {#each apps as app}
          <button
            class="flex flex-col items-center group focus:outline-none"
            on:click={() => handleAppClick(app)}
          >
            <div 
              class="w-16 h-16 rounded-2xl bg-white/10 p-2 backdrop-blur-md
                     group-hover:scale-110 group-hover:bg-white/20
                     transition-all duration-200 ease-out"
            >
              <img 
                src={app.icon} 
                alt={app.name}
                class="w-full h-full object-contain"
                draggable="false"
              />
            </div>
            <span class="mt-2 text-white text-sm font-medium opacity-90
                       group-hover:opacity-100 transition-opacity">
              {app.name}
            </span>
          </button>
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
  button {
    -webkit-tap-highlight-color: transparent;
  }
</style>