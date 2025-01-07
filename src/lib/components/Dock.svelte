<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import finderIcon from '$lib/assets/icons/finder.png';
  import safariIcon from '$lib/assets/icons/safari.png';
  import photosIcon from '$lib/assets/icons/photos.avif';
  import projectsIcon from '$lib/assets/icons/projects.png';
  import terminalIcon from '$lib/assets/icons/terminal.avif';
  import githubIcon from '$lib/assets/icons/github.png';
  import launchpadIcon from '$lib/assets/icons/launchpad.png';

  const dispatch = createEventDispatcher();

  type AppType = 'terminal' | 'safari' | 'photos' | 'projects' | 'github' | 'launchpad';

  interface App {
    name: string;
    type: AppType;
    icon: string;
    url?: string;
  }

  const apps: App[] = [
    { name: 'Launchpad', type: 'launchpad', icon: launchpadIcon },
    { name: 'Safari', type: 'safari', icon: safariIcon },
    { name: 'Photos', type: 'photos', icon: photosIcon },
    { name: 'Projects', type: 'projects', icon: projectsIcon },
    { name: 'Terminal', type: 'terminal', icon: terminalIcon },
    { name: 'GitHub', type: 'github', icon: githubIcon, url: 'https://github.com/yassin549' },
  ];

  export let isAppRunning: (type: 'terminal' | 'safari' | 'photos' | 'projects') => boolean;
  export let addWindow: (type: 'terminal' | 'safari' | 'photos' | 'projects') => void;

  function handleDockClick(app: App) {
    if (app.type === 'github' && app.url) {
      window.open(app.url, '_blank');
    } else if (app.type === 'launchpad') {
      dispatch('openLaunchpad');
    } else if (app.type !== 'github' && app.type !== 'launchpad') {
      addWindow(app.type);
    }
  }

  function handleKeydown(e: KeyboardEvent, app: App) {
    if (e.key === 'Enter' || e.key === ' ') {
      handleDockClick(app);
    }
  }

  let hoveredApp: AppType | null = null;
</script>

<div class="dock-container">
  <div class="dock">
    {#each apps as app}
      <button
        class="dock-item"
        class:running={app.type !== 'launchpad' && app.type !== 'github' && isAppRunning(app.type)}
        on:click={() => handleDockClick(app)}
        on:keydown={(e) => handleKeydown(e, app)}
        on:mouseenter={() => hoveredApp = app.type}
        on:mouseleave={() => hoveredApp = null}
      >
        <img
          src={app.icon}
          alt={app.name}
          class="dock-icon"
          class:hovered={hoveredApp === app.type}
          draggable="false"
        />
        {#if hoveredApp === app.type}
          <span class="dock-tooltip">
            {app.name}
          </span>
        {/if}
      </button>
    {/each}
  </div>
</div>

<style lang="postcss">
  .dock-container {
    @apply fixed bottom-0 left-0 right-0 flex justify-center p-2 pointer-events-none;
  }

  .dock {
    @apply flex items-end gap-1 p-2 rounded-2xl bg-white/20 backdrop-blur-xl pointer-events-auto;
    @apply border border-white/20 shadow-lg;
  }

  .dock-item {
    @apply relative flex items-center justify-center p-1 rounded-lg;
    @apply transition-all duration-200 ease-out;
    @apply hover:bg-white/20;
    @apply focus:outline-none focus:ring-2 focus:ring-white/50;
  }

  .dock-icon {
    @apply w-12 h-12 object-contain transition-all duration-200;
  }

  .dock-icon.hovered {
    @apply scale-150 -translate-y-4;
  }

  .running::after {
    content: '';
    @apply absolute bottom-0.5 left-1/2 w-1 h-1 rounded-full bg-white;
    transform: translateX(-50%);
  }

  .dock-tooltip {
    @apply absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1;
    @apply bg-gray-800/80 backdrop-blur-md text-white text-sm rounded-lg;
    @apply whitespace-nowrap;
  }

  :global(.dark) .dock {
    @apply bg-black/20;
  }
</style>
